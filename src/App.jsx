import React, { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Candidates, Applications } from './pages'

import './App.css'

const PageNotFound = () => <p>page not found</p>

const router = createBrowserRouter([
  {
    path: "/",
    element: <Candidates />,
  },
  {
    path: "/applications:id",
    element: <Applications />,
  },
]);

/* const routes = [
  { path: '/', component: { Candidates } },
  { path: '/samples:id', component: { Applications } },
  { path: '*', component: { PageNotFound } },
] */

const App = () => {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App