function asyncFetchRequest(path: string, offset: null | string = null, categoryId: null | string = null, search: null | string = null) {
    const urlParams = offset !== null && categoryId !== null && search !== null ? `?${new URLSearchParams({offset, categoryId, q: search})}` : ''
    
    return async () => {
        const response = await fetch(import.meta.env.VITE_SERVIER_URL + path + urlParams)
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const data = await response.json()
        return data
    }
}

const getTopSalesList = asyncFetchRequest('top-sales')
const getCategoriesList = asyncFetchRequest('categories')
const getCatalogItems = (offset: string, categoryId: string, search: string) => asyncFetchRequest('items', offset, categoryId, search)

export { getTopSalesList, getCategoriesList, getCatalogItems }