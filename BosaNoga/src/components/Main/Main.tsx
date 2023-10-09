import { useAppSelector } from "../../redux/hooks"
import TopSales from "../TopSales/TopSales"
import Card from "../Card/Card"
import { Outlet } from "react-router-dom"

function Main() {
  const state = useAppSelector(state => state.topSales)
  const topSalesElements = state.topSales.map(item => <Card key={item.id} item={item} />)

  return (
    <>
      <TopSales content={(
        <>
          <h2 className="text-center">Хиты продаж!</h2>
          <div className="row">{topSalesElements}</div>
        </>
      )} />
      <Outlet />
    </>
  )
}

export default Main