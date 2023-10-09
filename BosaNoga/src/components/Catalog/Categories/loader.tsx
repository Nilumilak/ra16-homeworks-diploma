import type { Params } from 'react-router-dom'
import { getCategoriesRequest } from '../../../redux/slices/categoriesSlice'
import store from '../../../redux/store'


async function loader() {
    store.dispatch(getCategoriesRequest())
    return null
}

export { loader }
