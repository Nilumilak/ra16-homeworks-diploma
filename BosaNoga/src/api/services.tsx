import type { TopSaleType } from '../redux/slices/topSalesSlice'
import type { CategorieType } from '../redux/slices/categoriesSlice'
import type { CatalogItemType } from '../redux/slices/catalogItemsSlice'

type asyncFetchRequestReturnType<T> = () => Promise<T>

function asyncFetchRequest (path: string, offset?: null | string, categoryId?: null | string, search?: null | string): () => Promise<TopSaleType>
function asyncFetchRequest (path: string, offset?: null | string, categoryId?: null | string, search?: null | string): () => Promise<CategorieType>
function asyncFetchRequest (path: string, offset: null | string = null, categoryId: null | string = null, search: null | string = null): () => Promise<CatalogItemType> {
  const urlParams = offset !== null && categoryId !== null && search !== null ? `?${new URLSearchParams({ offset, categoryId, q: search }).toString()}` : ''

  return async () => {
    const response = await fetch(import.meta.env.VITE_SERVIER_URL + path + urlParams)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    return data
  }
}

const getTopSalesList: asyncFetchRequestReturnType<TopSaleType> = asyncFetchRequest('top-sales')
const getCategoriesList: asyncFetchRequestReturnType<CategorieType> = asyncFetchRequest('categories')
const getCatalogItems: (offset: string, categoryId: string, search: string) => asyncFetchRequestReturnType<CatalogItemType> = (offset, categoryId, search) => asyncFetchRequest('items', offset, categoryId, search)

export { getTopSalesList, getCategoriesList, getCatalogItems }
