// export interface AuthState {
//   isAuthenticated: boolean;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//   } | null;
//   token: string | null;
// }
export interface AuthState {
  isAuthenticated: boolean;
  userName: string | null;
}

export const initalState: AuthState = {
  isAuthenticated: false,
  userName: null,
};