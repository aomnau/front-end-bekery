import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterFrom'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import Home from '../layout/Home'
import Product from '../components/product'
import AddressForm from '../components/AddressForm'
import Cart from '../components/cart'



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
      { path: '/cart', element: <Cart />},
      { path: '/product/:id', element: <Product />},
      {path: '/address', element: <AddressForm />}
    ]
  }
])
    
export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.user_id ? userRouter : guestRouter
  return (
    <RouterProvider router={finalRouter} />
  )
}
