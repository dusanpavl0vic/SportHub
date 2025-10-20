import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { authReducer } from "./auth/store/auth.reducer";
import { teamReducer } from "./store/team/team.reducer";

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  team: teamReducer,
};