import { createBrowserRouter } from 'react-router-dom'
import Main from './components/Main/Main'
import AboutStore from './components/AboutStore/AboutStore'
import Contacts from './components/Contants/Contacts'
import ErrorElement from './components/ErrorElement/ErrorElement'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: 'about',
        element: <AboutStore />,
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
      {
        path: '*',
        element: <ErrorElement />,
      }
    ]
  },
])

export default router
