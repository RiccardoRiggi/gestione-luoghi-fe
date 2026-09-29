import React from "react";

export const initialState = {
    testoSuccess: null,
    testoWarn: null,
    testoDanger: null
}

export const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'FETCH_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }

        default:
            return state;
    }
}