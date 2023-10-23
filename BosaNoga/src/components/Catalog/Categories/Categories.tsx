import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { changeCurrentCategory } from '../../../redux/slices/catalogItemsSlice'
import { getCategoriesRequest } from '../../../redux/slices/categoriesSlice'
import { Link } from 'react-router-dom'
import ErrorHandler from '../../ErrorHandler/ErrorHandler'
import Preloader from '../../Preloader/Preloader'

type CategoriesProps = {
  currentId: number
}

function Categories ({ currentId }: CategoriesProps): JSX.Element {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.categories)

  useEffect(() => {
    dispatch(getCategoriesRequest())
  }, [])

  function handleClick (categoryId: number): void {
    if (currentId !== categoryId) {
      dispatch(changeCurrentCategory({ categoryId }))
      currentId = categoryId
    }
  }

  const categoriesElements = state.categories.map(item => {
    return (
      <li key={item.id} className="nav-item">
        <Link onClick={() => { handleClick(item.id) }} className={currentId === item.id ? 'nav-link active' : 'nav-link'} to={'.'}>{item.title}</Link>
      </li>
    )
  })

  return (
    <>
      <ul className="catalog-categories nav justify-content-center">
        {
          state.loading
            ? <Preloader />
            : state.error
              ? <ErrorHandler handleReload={() => dispatch(getCategoriesRequest())} />
              : <>
                <li key={0} className="nav-item">
                  <Link onClick={() => { handleClick(0) }} className={currentId === 0 ? 'nav-link active' : 'nav-link'} to='.'>Все</Link>
                </li>
                {categoriesElements}
              </>
        }
      </ul>
    </>
  )
}

export default Categories
