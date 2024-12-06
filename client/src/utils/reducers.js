import { useReducer } from "react";
import {
  LOGIN_USER,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isloggin: action.login,
      };
   

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}
