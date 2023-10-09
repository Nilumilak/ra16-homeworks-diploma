import { useAppDispatch } from "../../../redux/hooks"
import { getCatalogItemsRequest } from "../../../redux/slices/catalogItemsSlice"


function LoadMoreItems() {
    const dispatch = useAppDispatch()

    function handleClick() {
        dispatch(getCatalogItemsRequest())
    }

    return (
        <div className="text-center">
            <button onClick={handleClick} className="btn btn-outline-primary">Загрузить ещё</button>
        </div>
    )
}

export default LoadMoreItems