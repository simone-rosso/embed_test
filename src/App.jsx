import React, { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
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

function getAllQuestions() {
  const questions = fetch('http://localhost:3010/questions')
    .then((response) => response.json())
    .then((data) => (data));
  return questions
}

function getAllCandidates() {
  const candidates = fetch('http://localhost:3010/candidates')
    .then((response) => response.json())
    .then((data) => (data));
  return candidates
}

function getAllApplications() {
  const applications = fetch('http://localhost:3010/applications')
    .then((response) => response.json())
    .then((data) => (data));
  return applications
}

const App = () => {
  const dispatch = useDispatch();
  const getAllData = async () => {
    const questions = await getAllQuestions()
    const candidates = await getAllCandidates()
    const applications = await getAllApplications()

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