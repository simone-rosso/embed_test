// Actions creators

import { 
    SET_CANDIDATES, 
    SET_QUESTIONS, 
    SET_APPLICATIONS, 
    SET_INITIAL_STATE,
    UPDATE_APPLICATION
} from "./types";

export const setInitialState = (initialState) => ({
    type: SET_INITIAL_STATE,
    payload: initialState
})

export const setCandidates = (candidates) => ({
    type: SET_CANDIDATES,
    payload: candidates
})

export const setApplications = (applications) => ({
    type: SET_APPLICATIONS,
    payload: applications
})

export const setQuestions = (questions) => ({
    type: SET_QUESTIONS,
    payload: questions
})

export const updateApplication = (application) => ({
    type: UPDATE_APPLICATION,
    payload: application
})
