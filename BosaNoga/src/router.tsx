import { createBrowserRouter } from 'react-router-dom'
import RootElement from './components/RootElement/RootElement'
import TopSales from './components/TopSales/TopSales'
import Main from './components/Main/Main'
import AboutStore from './components/AboutStore/AboutStore'
import Contacts from './components/Contants/Contacts'
import ErrorElement from './components/ErrorElement/ErrorElement'
import Catalog from './components/Catalog/Catalog'
import CatalogItemDetailed from './components/CatalogItemDetailed/CatalogItemDetailed'
import Cart from './components/Cart/Cart'

const router = createBrowserRouter([
  {
    path: `${import.meta.env.VITE_BASE_PATH}/`,
    element: <RootElement />,
    children: [
      {
        path: `${import.meta.env.VITE_BASE_PATH}/`,
        element: <Main />,
        children: [
          {
            path: `${import.meta.env.VITE_BASE_PATH}/`,
            element: <Catalog />
          }
        ]
      },
      {
        path: 'about',
        element: <TopSales content={<AboutStore />} />
      },
      {
        path: 'contacts',
        element: <TopSales content={<Contacts />} />
      },
      {
        path: 'catalog',
        element: (
          <>
            <Catalog hasSearchForm/>
          </>
        )
      },
      {
        path: 'catalog/:id',
        element: (
          <>
            <CatalogItemDetailed />
          </>
        )
      },
      {
        path: 'cart',
        element: (
          <>
            <Cart />
          </>
        )
      },
      {
        path: '*',
        element: <ErrorElement />
      }
    ]
  }
])

export default router
