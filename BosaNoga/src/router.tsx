import { createBrowserRouter } from 'react-router-dom'
import RootElement from './components/RootElement/RootElement'
import TopSales from './components/TopSales/TopSales'
import Main from './components/Main/Main'
import AboutStore from './components/AboutStore/AboutStore'
import Contacts from './components/Contants/Contacts'
import ErrorElement from './components/ErrorElement/ErrorElement'
import Catalog from './components/Catalog/Catalog'


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootElement />,
    children: [
      {
        path: '/',
        element: <Main />,
        children: [
          {
            path: '/',
            element: <Catalog />,
          }
        ]
      },
      {
        path: 'about',
        element: <TopSales content={<AboutStore />} />,
      },
      {
        path: 'contacts',
        element: <TopSales content={<Contacts />} />,
      },
      {
        path: 'catalog',
        element: (
          <>
            <Catalog hasSearchForm/>
          </>
        ),
      },
      {
        path: '*',
        element: <ErrorElement />,
      }
    ]
  },
])

export default router
