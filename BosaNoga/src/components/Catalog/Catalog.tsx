import { useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import Categories from './Categories/Categories'
import CatalogItems from './CatalogItems/CatalogItems'
import LoadMoreItems from './LoadMoreItems/LoadMoreItems'
import CatalogSearchForm from './CatalogSearchForm/CatalogSearchForm'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { changeCurrentCategory, changeSearchParam } from '../../redux/slices/catalogItemsSlice'
import './Catalog.css'

type CatalogProps = {
  hasSearchForm: boolean
}

function Catalog ({ hasSearchForm }: CatalogProps): JSX.Element {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.catalogItems)
  const match = useMatch('/')

  useEffect(() => {
    dispatch(changeCurrentCategory({ categoryId: 0 }))
    if (match) {
      dispatch(changeSearchParam({ search: '' }))
    }
  }, [])
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {hasSearchForm && <CatalogSearchForm />}
      <Categories currentId={state.currentCategoryId} />
      <CatalogItems />
      {state.hasMoreItems ? <LoadMoreItems isActive={state.loading} /> : null}
    </section>
  )
}

Catalog.defaultProps = {
  hasSearchForm: false
}

export default Catalog
