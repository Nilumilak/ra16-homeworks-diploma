import { takeLatest, put, call } from 'redux-saga/effects'
import type { PutEffect, CallEffect, ForkEffect } from 'redux-saga/effects'
import { getCategoriesFailure, getCategoriesRequest, getCategoriesSuccess } from '../redux/slices/categoriesSlice'
import { getCategoriesList } from '../api/services'
import type { CategorieType } from '../redux/slices/categoriesSlice'

function isCategoryType(data: unknown): data is CategorieType[] {
  if (data instanceof Array) {
    return data.every(item => Object.keys(item).includes('id') &&
      Object.keys(item).includes('title'))
  }
  return false
}

function* handleGetCategoriesRequestSaga(): Generator<PutEffect | CallEffect> {
  try {
    const data = yield call(getCategoriesList)
    if (isCategoryType(data)) {
      yield put(getCategoriesSuccess({ categories: data }))
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(getCategoriesFailure({ error }))
    }
  }
}

function* watchGetCategoriesRequestSaga(): Generator<ForkEffect> {
  yield takeLatest(getCategoriesRequest.type, handleGetCategoriesRequestSaga)
}

export { watchGetCategoriesRequestSaga }
