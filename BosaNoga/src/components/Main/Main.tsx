import { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import TopSales from "../TopSales/TopSales"
import Card from "../Card/Card"
import { getTopSalesRequest } from '../../redux/slices/topSalesSlice'
import FetchingComponent from '../FetchingComponent/FetchingComponent'


function Main() {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.topSales)
  const topSalesElements = state.topSales.map(item => <Card key={item.id} item={item} />)

  useEffect(() => {
    dispatch(getTopSalesRequest())
  }, [])

  return (
    <>
      <TopSales content={(
        <>
          <h2 className="text-center">Хиты продаж!</h2>
          <div className="row">
            <FetchingComponent
              data={topSalesElements}
              loadingState={state.loading}
              errorState={state.error}
              reFetchFunction={() => dispatch(getTopSalesRequest())}
            />
          </div>
        </>
      )} />
      <Outlet />
    </>
  )
}

export default Main
