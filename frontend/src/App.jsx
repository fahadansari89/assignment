import React from 'react'
import Signup from './auth/signup'
import Login from './auth/login'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Home from './home'

const App = () => {
  const appRouter=createBrowserRouter([
      {
        path:'/',
        element:<Login/>
      },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/home',
      element:<Home/>
    },
  ])
  return (
    // <>
    // <Signup/>
    // </>
    <div>
    <RouterProvider router={appRouter}/>
    </div>
  )
  
}

export default App