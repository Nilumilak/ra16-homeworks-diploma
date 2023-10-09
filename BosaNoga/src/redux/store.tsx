import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/rootSaga'
import topSalesSlice from './slices/topSalesSlice'
import categoriesSlice from './slices/categoriesSlice'
import catalogItemsSlice from './slices/catalogItemsSlice'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    topSales: topSalesSlice,
    categories: categoriesSlice,
    catalogItems: catalogItemsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
