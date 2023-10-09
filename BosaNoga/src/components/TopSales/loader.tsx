import type { Params } from 'react-router-dom'
import { getTopSalesRequest } from '../../redux/slices/topSalesSlice'
import store from '../../redux/store'


async function loader() {
    store.dispatch(getTopSalesRequest())
    return null
}

export { loader }
