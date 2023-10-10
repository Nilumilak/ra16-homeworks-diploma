import { useAppSelector, useAppDispatch } from "../../../redux/hooks"
import { changeCurrentCategory } from "../../../redux/slices/catalogItemsSlice"
import { Link } from "react-router-dom"


type CategoriesProps = {
    currentId: number
}

function Categories({ currentId }: CategoriesProps) {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state.categories)

    function handleClick(categoryId: number) {
        if (currentId !== categoryId) {
            dispatch(changeCurrentCategory({ categoryId }))
            currentId = categoryId
        }
    }

    const categoriesElements = state.categories.map(item => {
        return (
            <li key={item.id} className="nav-item">
                <Link onClick={() => handleClick(item.id)} className={currentId === item.id ? 'nav-link active' : 'nav-link'} to={`/`}>{item.title}</Link>
            </li>
        )
    })

    return (
        <>
            <ul className="catalog-categories nav justify-content-center">
                <li key={0} className="nav-item">
                    <Link onClick={() => handleClick(0)} className={currentId === 0 ? 'nav-link active' : 'nav-link'} to='/'>Все</Link>
                </li>
                {categoriesElements}
            </ul>
        </>
    )
}

export default Categories