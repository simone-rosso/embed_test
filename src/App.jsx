import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setInitialState } from "./redux/actions";

import { Candidates, Applications } from './pages'

import './App.css'


// add a page not found component for undefined routes
// const PageNotFound = () => <p>page not found</p>

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


function getAll(key) {
  const value = fetch(`http://localhost:3010/${key}`)
    .then((response) => response.json())
    .then((data) => (data));
  return value
}

const App = () => {
  const dispatch = useDispatch();
  const getAllData = async () => {
    const questions = await getAll('questions')
    const candidates = await getAll('candidates')
    const applications = await getAll('applications')

    dispatch(setInitialState({ applications: applications, questions: questions, candidates: candidates }))
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