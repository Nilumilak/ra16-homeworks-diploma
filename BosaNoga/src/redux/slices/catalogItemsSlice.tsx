import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type CatalogItemType = {
    id: number
    category: string
    title: string
    price: number
    images: string[]
}

type CatalogItemState = {
    catalogItems: CatalogItemType[],
    loading: boolean,
    error: string | null
    offset: number
    currentCategoryId: number
}

const initialState: CatalogItemState = {
    catalogItems: [],
    loading: false,
    error: null,
    offset: 0,
    currentCategoryId: 0
}

const catalogItemsSlice = createSlice({
    name: 'catalogItems',
    initialState,
    reducers: {
        getCatalogItemsRequest: (state) => {
            state.loading = true
            state.error = null
        },
        getCatalogItemsFailure: (state, action: PayloadAction<{ error: Error }>) => {
            const error = action.payload.error
            state.loading = false
            state.error = error.message
        },
        getCatalogItemsSuccess: (state, action: PayloadAction<{ catalogItems: CatalogItemType[] }>) => {
            const catalogItems = action.payload.catalogItems
            state.catalogItems.push(...catalogItems)
            state.loading = false
            state.error = null
            state.offset += action.payload.catalogItems.length
        },
        changeCurrentCategory: (state, action: PayloadAction<{ categoryId: number }>) => {
            const categoryId = action.payload.categoryId
            if (state.currentCategoryId !== categoryId) {
                state.catalogItems = []
                state.currentCategoryId = categoryId
                state.offset = 0
            }
        },
    }
})

export const { getCatalogItemsFailure, getCatalogItemsRequest, getCatalogItemsSuccess, changeCurrentCategory } = catalogItemsSlice.actions
export default catalogItemsSlice.reducer
export type { CatalogItemType }
