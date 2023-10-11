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
    searchParam: string
    hasMoreItems: boolean
}

const initialState: CatalogItemState = {
    catalogItems: [],
    loading: false,
    error: null,
    offset: 0,
    currentCategoryId: 0,
    searchParam: '',
    hasMoreItems: true
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
            state.offset += catalogItems.length
            if (catalogItems.length < 6) {
                state.hasMoreItems = false
            }
        },
        changeCurrentCategory: (state, action: PayloadAction<{ categoryId: number }>) => {
            const categoryId = action.payload.categoryId
            state.catalogItems = []
            state.currentCategoryId = categoryId
            state.offset = 0
            state.hasMoreItems = true
        },
        changeSearchParam: (state, action: PayloadAction<{ search: string }>) => {
            const search = action.payload.search
            state.catalogItems = []
            state.searchParam = search
            state.offset = 0
            state.hasMoreItems = true
        },
    }
})

export const { getCatalogItemsFailure, getCatalogItemsRequest, getCatalogItemsSuccess, changeCurrentCategory, changeSearchParam } = catalogItemsSlice.actions
export default catalogItemsSlice.reducer
export type { CatalogItemType }
