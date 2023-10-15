import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type CategorieType = {
  id: number
  title: string
}

type CategoriesState = {
  categories: CategorieType[]
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesRequest: (state) => {
      state.loading = true
      state.error = null
    },
    getCategoriesFailure: (state, action: PayloadAction<{ error: string }>) => {
      const error = action.payload.error
      state.loading = false
      state.error = error
    },
    getCategoriesSuccess: (state, action: PayloadAction<{ categories: CategorieType[] }>) => {
      const categories = action.payload.categories
      state.categories = categories
      state.loading = false
      state.error = null
    }
  }
})

export const { getCategoriesFailure, getCategoriesRequest, getCategoriesSuccess } = categoriesSlice.actions
export default categoriesSlice.reducer
export type { CategorieType }
