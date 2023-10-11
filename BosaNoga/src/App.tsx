import { RouterProvider } from 'react-router-dom'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

function App (): JSX.Element {
  return (
    <RouterProvider router={router} />
  )
}

export default App
