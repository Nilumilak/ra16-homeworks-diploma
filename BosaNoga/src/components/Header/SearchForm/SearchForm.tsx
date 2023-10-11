import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FormEvent, RefObject } from 'react'
import { useAppDispatch } from '../../../redux/hooks'
import { changeSearchParam } from '../../../redux/slices/catalogItemsSlice'

type SearchFormProps = {
  inputRef: RefObject<HTMLInputElement>
  setSelfActive: (active: boolean) => void
}

function SearchForm ({ inputRef, setSelfActive }: SearchFormProps): JSX.Element {
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  function handleSubmit (e: FormEvent): void {
    e.preventDefault()
    if (search.trim()) {
      dispatch(changeSearchParam({ search: search.trim() }))
      setSearch('')
      navigate('/catalog')
    }
    setSelfActive(false)
  }

  return (
        <form onSubmit={handleSubmit} data-id="search-form" className="header-controls-search-form form-inline">
            <input ref={inputRef} value={search} onChange={(e) => { setSearch(e.target.value) }} className="form-control" placeholder="Поиск" />
        </form>
  )
}

export default SearchForm
