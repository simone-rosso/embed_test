import { SET_CANDIDATES, SET_APPLICATIONS, SET_QUESTIONS, SET_INITIAL_STATE } from "./types";

const INITIAL_STATE = {
    candidates: [],
    questions: [],
    applications: []
}

export default (state = INITIAL_STATE, action) => {
    console.log(action.payload)
    switch (action.type) {
        case SET_CANDIDATES:
            return {
                ...state,
                candidates: action.payload
            };
        case SET_APPLICATIONS:
            return {
                ...state,
                applications: action.payload
            };
        case SET_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            };
        case SET_INITIAL_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};