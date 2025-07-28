import { createReducer, on } from "@ngrx/store";
import { login, logout } from "./auth.action";
import { initalState } from "./auth.model";

export const authReducer = createReducer(
  initalState,

  on(login, (state, { userName }) => {
    return {
      ...state,
      isAuthenticated: true,
      userName: userName
    }
  }),

  on(logout, (state) => {
    return {
      ...state,
      isAuthenticated: false,
      userName: null
    }
  })
)