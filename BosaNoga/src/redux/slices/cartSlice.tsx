import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type CartItemType = {
  id: number
  title: string
  size: string
  quantity: number
  price: number
}

type CartState = {
  items: CartItemType[]
  fullPrice: number
}

const items = localStorage.getItem('items')
const cartItems: CartItemType[] = items ? JSON.parse(items) : []
const fullPrice = Number(localStorage.getItem('fullPrice'))

const initialState: CartState = {
  items: cartItems,
  fullPrice
}

function setCartItemsToLocalStorage (items: CartItemType[], fullPrice: number): void {
  localStorage.setItem('items', JSON.stringify(items))
  localStorage.setItem('fullPrice', String(fullPrice))
}

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCartItemsFromLocalStorage: (state) => {
      const items = localStorage.getItem('items')
      const cartItems: CartItemType[] = items ? JSON.parse(items) : []
      const fullPrice = Number(localStorage.getItem('fullPrice'))
      state.items = cartItems
      state.fullPrice = fullPrice
    },
    addCartItem: (state, action: PayloadAction<{ item: CartItemType }>) => {
      const item = action.payload.item
      const existingItem = state.items.find(cartItem => cartItem.id === item.id && cartItem.size === item.size)
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        state.items.push(item)
      }
      state.fullPrice += (item.price * item.quantity)
      setCartItemsToLocalStorage(state.items, state.fullPrice)
    },
    removeCartItem: (state, action: PayloadAction<{ item: CartItemType }>) => {
      const item = action.payload.item
      state.items = state.items.filter(cartItem => cartItem.id !== item.id || cartItem.size !== item.size)
      state.fullPrice -= (item.price * item.quantity)
      setCartItemsToLocalStorage(state.items, state.fullPrice)
    },
    clearCart: (state) => {
      state.items = []
      state.fullPrice = 0
      setCartItemsToLocalStorage(state.items, state.fullPrice)
    }
  }
})

export const { addCartItem, removeCartItem, clearCart, loadCartItemsFromLocalStorage } = CartSlice.actions
export default CartSlice.reducer
export type { CartItemType }
