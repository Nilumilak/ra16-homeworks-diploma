import { takeLatest, put } from 'redux-saga/effects'
import { loadCartItemsFromLocalStorage, addCartItem, removeCartItem } from '../redux/slices/cartSlice'
import type { PutEffect, CallEffect, ForkEffect, SelectEffect } from 'redux-saga/effects'

function * handleCartActionSaga (): Generator<PutEffect | CallEffect | SelectEffect> {
  yield put(loadCartItemsFromLocalStorage())
}

function * watchCartActionSaga (): Generator<ForkEffect> {
  yield takeLatest(addCartItem.type, handleCartActionSaga)
  yield takeLatest(removeCartItem.type, handleCartActionSaga)
}

export { watchCartActionSaga }
