import { useAppDispatch } from '../../../redux/hooks'
import { getCatalogItemsRequest } from '../../../redux/slices/catalogItemsSlice'

function LoadMoreItems (): JSX.Element {
  const dispatch = useAppDispatch()

  function handleClick (): void {
    dispatch(getCatalogItemsRequest())
  }

  return (
        <div className="text-center">
            <button onClick={handleClick} className="btn btn-outline-primary">Загрузить ещё</button>
        </div>
  )
}

export default LoadMoreItems
