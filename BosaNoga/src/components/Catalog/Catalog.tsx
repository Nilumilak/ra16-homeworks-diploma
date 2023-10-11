import Categories from "./Categories/Categories"
import CatalogItems from "./CatalogItems/CatalogItems"
import LoadMoreItems from "./LoadMoreItems/LoadMoreItems"
import CatalogSearchForm from "./CatalogSearchForm/CatalogSearchForm"
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import { useEffect } from 'react'
import { getCatalogItemsRequest, changeCurrentCategory, changeSearchParam } from "../../redux/slices/catalogItemsSlice"
import { useMatch } from "react-router-dom"
import Preloader from "../Preloader/Preloader"
import './Catalog.css'


type CatalogProps = {
  hasSearchForm: boolean
}

function Catalog({ hasSearchForm }: CatalogProps) {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.catalogItems)
  const categoriesLoadingState = useAppSelector(state => state.categories.loading)
  const match = useMatch('/')

  useEffect(() => {
    dispatch(changeCurrentCategory({ categoryId: 0 }))
    if (match) {
      dispatch(changeSearchParam({ search: '' }))
    }
  }, [])

  useEffect(() => {
    dispatch(getCatalogItemsRequest())
  }, [state.currentCategoryId, state.searchParam])

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {hasSearchForm && <CatalogSearchForm />}

      {state.loading || categoriesLoadingState ? <Preloader /> : <>
        <Categories currentId={state.currentCategoryId} />
        <CatalogItems items={state.catalogItems} />
        {state.hasMoreItems ? <LoadMoreItems /> : null}
      </>}
    </section>
  )
}

Catalog.defaultProps = {
  hasSearchForm: false
}

export default Catalog