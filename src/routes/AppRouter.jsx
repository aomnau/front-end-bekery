import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterFrom'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import UserHome from '../layout/UserHome'
import NewTodoForm from '../layout/NewTodoForm'
import Homepage from '../layout/Homepage'


const guestRouter = createBrowserRouter([

  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      { index: true, element: <Homepage />},
      { path: '/login', element: <LoginForm /> },
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
      { index: true, element: <UserHome /> },
      { path: '/new', element: <NewTodoForm />}
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
