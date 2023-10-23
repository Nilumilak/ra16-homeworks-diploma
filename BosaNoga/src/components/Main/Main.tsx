import { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import TopSales from "../TopSales/TopSales"
import Card from "../Card/Card"
import Preloader from "../Preloader/Preloader"
import { getTopSalesRequest } from '../../redux/slices/topSalesSlice'
import ErrorHandler from '../ErrorHandler/ErrorHandler'


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
            {
              state.loading ?
                <Preloader /> :
                state.error ?
                  <ErrorHandler handleReload={() => dispatch(getTopSalesRequest())} /> :
                  topSalesElements
            }
          </div>
        </>
      )} />
      <Outlet />
    </>
  )
}

export default Main