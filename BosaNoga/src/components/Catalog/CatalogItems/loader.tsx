import type { Params } from 'react-router-dom'
import { getCatalogItemsRequest } from '../../../redux/slices/catalogItemsSlice'
import store from '../../../redux/store'


async function loader() {
    store.dispatch(getCatalogItemsRequest())
    return null
}

export { loader }
