import { useAppDispatch } from '../../../redux/hooks'
import { getCatalogItemsRequest } from '../../../redux/slices/catalogItemsSlice'


type LoadMoreItemsProps = {
  isActive: boolean
}

function LoadMoreItems({ isActive }: LoadMoreItemsProps): JSX.Element {
  const dispatch = useAppDispatch()

  function handleClick(): void {
    dispatch(getCatalogItemsRequest())
  }

  return (
    <div className="text-center">
      <button onClick={handleClick} className="btn btn-outline-primary" disabled={isActive} >Загрузить ещё</button>
    </div>
  )
}

export default LoadMoreItems
