import { AuthState } from "./store/auth/auth.model";

export interface AppState {
  auth: AuthState;
}