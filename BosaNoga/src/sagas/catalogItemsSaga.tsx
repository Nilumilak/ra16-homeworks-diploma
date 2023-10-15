import { takeLatest, put, call, select } from 'redux-saga/effects'
import type { PutEffect, CallEffect, ForkEffect, SelectEffect } from 'redux-saga/effects'
import { getCatalogItemsFailure, getCatalogItemsRequest, getCatalogItemsSuccess } from '../redux/slices/catalogItemsSlice'
import { getCatalogItems } from '../api/services'
import type { CatalogItemType, CatalogItemState } from '../redux/slices/catalogItemsSlice'
import { type RootState } from '../redux/store'

function isCatalogItemType (data: unknown): data is CatalogItemType[] {
  if (data instanceof Array) {
    return data.every(item => Object.keys(item).includes('id') &&
      Object.keys(item).includes('category') &&
      Object.keys(item).includes('title') &&
      Object.keys(item).includes('price') &&
      Object.keys(item).includes('images'))
  }
  return false
}

function isCatalogItemState (data: unknown): data is CatalogItemState {
  if (data instanceof Object) {
    return Object.keys(data).includes('catalogItems') &&
      Object.keys(data).includes('loading') &&
      Object.keys(data).includes('error') &&
      Object.keys(data).includes('offset') &&
      Object.keys(data).includes('currentCategoryId') &&
      Object.keys(data).includes('searchParam') &&
      Object.keys(data).includes('hasMoreItems')
  }
  return false
}

function * handleGetCatalogItemsRequestSaga (): Generator<PutEffect | CallEffect | SelectEffect> {
  const catalogItems = yield select((state: RootState) => state.catalogItems)

  if (isCatalogItemState(catalogItems)) {
    try {
      const data = yield call(getCatalogItems(String(catalogItems.offset), String(catalogItems.currentCategoryId), catalogItems.searchParam))
      if (isCatalogItemType(data)) {
        yield put(getCatalogItemsSuccess({ catalogItems: data }))
      }
    } catch (error) {
      if (error instanceof Error) {
        yield put(getCatalogItemsFailure({ error: error.message }))
      }
    }
  }
}

function * watchGetCatalogItemsRequestSaga (): Generator<ForkEffect> {
  yield takeLatest(getCatalogItemsRequest.type, handleGetCatalogItemsRequestSaga)
}

export { watchGetCatalogItemsRequestSaga }
