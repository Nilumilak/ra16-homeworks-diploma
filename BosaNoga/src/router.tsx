import { createBrowserRouter } from 'react-router-dom'
import Main from './components/Main/Main'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
])

export default router
