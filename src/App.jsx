'use strict'

// Dependdencies
import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useDispatch } from 'react-redux'

// Redux
import { setInitialState } from "./redux/actions";

// Components
import { Candidates } from './pages'

const router = createBrowserRouter([

  /* With more time I would have implemented different routes
     add a page not found component for undefined routes
     const PageNotFound = () => <p>page not found</p>

  {
    path: "/applications:id",
    element: <Applications />,
  }, */
  {
    path: "/",
    element: <Candidates />,
  }
]);


function getAll(key) {
  const value = fetch(`http://localhost:3010/${key}`)
    .then((response) => response.json())
    .then((data) => (data));
  return value
}

const App = () => {
  const dispatch = useDispatch();
  const getAllData = async () => {

    // With the new version of react, it hasn't to be use the function batch to dispatch different actions
    // And the calls simulate an API call to different endpoints

    const questions = await getAll('questions')
    const candidates = await getAll('candidates')
    const applications = await getAll('applications')

    dispatch(setInitialState({
      applications: applications,
      questions: questions,
      candidates: candidates
    }))
  };

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <div className='app-layout'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App