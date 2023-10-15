import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type TopSaleType = {
  id: number
  category: string
  title: string
  price: number
  images: string[]
}

type TopSalesState = {
  topSales: TopSaleType[]
  loading: boolean
  error: string | null
}

const initialState: TopSalesState = {
  topSales: [],
  loading: false,
  error: null
}

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {
    getTopSalesRequest: (state) => {
      state.loading = true
      state.error = null
    },
    getTopSalesFailure: (state, action: PayloadAction<{ error: string }>) => {
      const error = action.payload.error
      state.loading = false
      state.error = error
    },
    getTopSalesSuccess: (state, action: PayloadAction<{ topSales: TopSaleType[] }>) => {
      const topSales = action.payload.topSales
      state.topSales = topSales
      state.loading = false
      state.error = null
    }
  }
})

export const { getTopSalesFailure, getTopSalesRequest, getTopSalesSuccess } = topSalesSlice.actions
export default topSalesSlice.reducer
export type { TopSaleType }
