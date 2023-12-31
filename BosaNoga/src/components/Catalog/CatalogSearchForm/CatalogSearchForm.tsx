import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { changeSearchParam } from '../../../redux/slices/catalogItemsSlice'
import type { FormEvent } from 'react'

function CatalogSearchForm (): JSX.Element {
  const searchParam = useAppSelector(state => state.catalogItems.searchParam)
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState<string>(searchParam)

  useEffect(() => {
    setSearch(searchParam)
  }, [searchParam])

  function handleSubmit (e: FormEvent): void {
    e.preventDefault()
    if (searchParam !== search.trim()) {
      dispatch(changeSearchParam({ search: search.trim() }))
    }
  }

  return (
        <form onSubmit={handleSubmit} className="catalog-search-form form-inline">
            <input value={search} onChange={(e) => { setSearch(e.target.value) }} className="form-control" placeholder="Поиск" />
        </form>
  )
}

export default CatalogSearchForm
