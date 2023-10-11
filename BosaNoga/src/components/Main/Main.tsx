import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import TopSales from "../TopSales/TopSales"
import Card from "../Card/Card"
import Preloader from "../Preloader/Preloader"
import { Outlet } from "react-router-dom"
import { getTopSalesRequest } from '../../redux/slices/topSalesSlice'
import { getCategoriesRequest } from '../../redux/slices/categoriesSlice'

function Main() {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.topSales)
  const topSalesElements = state.topSales.map(item => <Card key={item.id} item={item} />)

  useEffect(() => {
    dispatch(getTopSalesRequest())
    dispatch(getCategoriesRequest())
  }, [])

  return (
    <>
      <TopSales content={(
        <>
          <h2 className="text-center">Хиты продаж!</h2>
          <div className="row">{state.loading ? <Preloader /> : topSalesElements}</div>
        </>
      )} />
      <Outlet />
    </>
  )
}

export default Main