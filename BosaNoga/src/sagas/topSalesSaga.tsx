import { takeLatest, put, call } from 'redux-saga/effects'
import type { PutEffect, CallEffect, ForkEffect } from 'redux-saga/effects'
import { getTopSalesFailure, getTopSalesRequest, getTopSalesSuccess } from '../redux/slices/topSalesSlice'
import { getTopSalesList } from '../api/services'
import type { TopSaleType } from '../redux/slices/topSalesSlice'

function isTopSaleTypeType(data: unknown): data is TopSaleType[] {
  if (data instanceof Array) {
    return data.every(item => Object.keys(item).includes('id') &&
      Object.keys(item).includes('category') &&
      Object.keys(item).includes('title') &&
      Object.keys(item).includes('price') &&
      Object.keys(item).includes('images'))
  }
  return false
}

function* handleGetTopSalesRequestSaga(): Generator<PutEffect | CallEffect> {
  try {
    const data = yield call(getTopSalesList)
    if (isTopSaleTypeType(data)) {
      yield put(getTopSalesSuccess({ topSales: data }))
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(getTopSalesFailure({ error }))
    }
  }
}

function* watchGetTopSalesRequestSaga(): Generator<ForkEffect> {
  yield takeLatest(getTopSalesRequest.type, handleGetTopSalesRequestSaga)
}

export { watchGetTopSalesRequestSaga }
