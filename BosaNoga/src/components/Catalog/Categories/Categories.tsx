import { useAppSelector, useAppDispatch } from "../../../redux/hooks"
import { changeCurrentCategory } from "../../../redux/slices/catalogItemsSlice"
import { NavLink } from "react-router-dom"
import { useRef } from 'react'

function Categories() {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state.categories)
    const currentCategoryId = useRef<number>(0)

    function handleClick(categoryId: number) {
        if (currentCategoryId.current !== categoryId) {
            dispatch(changeCurrentCategory({ categoryId }))
            currentCategoryId.current = categoryId
        }
    }

    const categoriesElements = state.categories.map(item => {
        return (
            <li key={item.id} className="nav-item">
                <NavLink onClick={() => handleClick(item.id)} className='nav-link' to={`/category/${item.id}`}>{item.title}</NavLink>
            </li>
        )
    })

    return (
        <>
            <ul className="catalog-categories nav justify-content-center">
                <li className="nav-item">
                    <NavLink onClick={() => handleClick(0)} className="nav-link" to='/'>Все</NavLink>
                </li>
                {categoriesElements}
            </ul>
        </>
    )
}

export default Categories