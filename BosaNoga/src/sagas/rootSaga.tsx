import { spawn } from 'redux-saga/effects'
import type { ForkEffect } from 'redux-saga/effects'
import { watchGetTopSalesRequestSaga } from './topSalesSaga'
import { watchGetCategoriesRequestSaga } from './categoriesSaga'
import { watchGetCatalogItemsRequestSaga } from './catalogItemsSaga'


function * rootSaga (): Generator<ForkEffect> {
    yield spawn(watchGetTopSalesRequestSaga)
    yield spawn(watchGetCategoriesRequestSaga)
    yield spawn(watchGetCatalogItemsRequestSaga)
}

export default rootSaga
