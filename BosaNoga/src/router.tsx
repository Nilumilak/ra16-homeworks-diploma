import { createBrowserRouter } from 'react-router-dom'
import RootElement from './components/RootElement/RootElement'
import TopSales from './components/TopSales/TopSales'
import Main from './components/Main/Main'
import { loader as mainLoader } from './components/Main/loader'
import AboutStore from './components/AboutStore/AboutStore'
import Contacts from './components/Contants/Contacts'
import ErrorElement from './components/ErrorElement/ErrorElement'
import Catalog from './components/Catalog/Catalog'
import { loader as catalogItemsLoader } from './components/Catalog/CatalogItems/loader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootElement />,
    children: [
      {
        path: '/',
        element: <Main />,
        loader: mainLoader,
        children: [
          {
            path: '/',
            element: <Catalog />,
            loader: catalogItemsLoader
          },
          {
            path: 'category/:categoryId',
            element: <Catalog />,
            loader: catalogItemsLoader
          }
        ]
      },
      {
        path: 'about',
        element: <TopSales content={<AboutStore />}/>,
      },
      {
        path: 'contacts',
        element: <TopSales content={<Contacts />}/>,
      },
      {
        path: '*',
        element: <ErrorElement />,
      }
    ]
  },
])

export default router
