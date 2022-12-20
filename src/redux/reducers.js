import {
    SET_CANDIDATES,
    SET_APPLICATIONS,
    SET_QUESTIONS,
    SET_INITIAL_STATE,
    UPDATE_APPLICATION
} from "./types";

const INITIAL_STATE = {
    candidates: [],
    questions: [],
    applications: []
}

export default (state = INITIAL_STATE, action) => {
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
        case UPDATE_APPLICATION:
            return {
                ...state,
                applications: state.applications.map((application) => {
                    if (application.id === action.payload.id) return action.payload
                    return application
                })
            }
        default:
            return state;
    }
};