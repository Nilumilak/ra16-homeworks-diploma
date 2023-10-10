import Categories from "./Categories/Categories"
import CatalogItems from "./CatalogItems/CatalogItems"
import LoadMoreItems from "./LoadMoreItems/LoadMoreItems"
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import { useEffect } from 'react'
import { getCatalogItemsRequest } from "../../redux/slices/catalogItemsSlice"


function Catalog() {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.catalogItems)

  useEffect(() => {
    dispatch(getCatalogItemsRequest())
  }, [state.currentCategoryId])

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <Categories currentId={state.currentCategoryId}/>
      <CatalogItems items={state.catalogItems} />
      {state.hasMoreItems ? <LoadMoreItems /> : null}
    </section>
  )
}

export default Catalog