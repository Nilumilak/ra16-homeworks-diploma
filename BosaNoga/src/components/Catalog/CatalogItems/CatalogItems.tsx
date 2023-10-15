import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import Card from '../../Card/Card'
import Preloader from '../../Preloader/Preloader'
import { getCatalogItemsRequest } from '../../../redux/slices/catalogItemsSlice'
import NoData from '../../NoData/NoData'
import ErrorHandler from '../../ErrorHandler/ErrorHandler'

function CatalogItems (): JSX.Element {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.catalogItems)

  useEffect(() => {
    dispatch(getCatalogItemsRequest())
  }, [state.currentCategoryId, state.searchParam])

  const catalogItemsElements = state.catalogItems.map(item => <Card key={item.id} item={item} isCatalogItem />)

  return (
    <div className="row">
      {
        state.loading
          ? <Preloader />
          : state.error
            ? <ErrorHandler handleReload={() => dispatch(getCatalogItemsRequest())} />
            : catalogItemsElements.length === 0
              ? <NoData />
              : catalogItemsElements
      }
    </div>
  )
}

export default CatalogItems
