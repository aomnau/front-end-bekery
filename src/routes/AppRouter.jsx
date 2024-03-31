import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterFrom'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import Home from '../layout/Home'
import NewTodoForm from '../layout/NewTodoForm'
import Product from '../components/product'



const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Outlet />
    </>,
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/register', element: <RegisterForm />}
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <Home /> },
      { path: '/new', element: <NewTodoForm />},
      { path: '/product/:id', element: <Product />}
    ]
  }
])
    
export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.id ? userRouter : guestRouter
  return (
    <RouterProvider router={finalRouter} />
  )
}
