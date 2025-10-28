import { Store } from '@ngrx/store';
import * as AuthActions from "src/app/auth/store/auth.action";
import { AppState } from './app.state';
import { AuthService } from './auth/service/auth.service';
import { JwtService } from './core/services/jwt.service';


export function appInitializerFactory(
  store: Store<AppState>,
  jwtService: JwtService,
  authService: AuthService
) {
  return () => {
    const token = localStorage.getItem('token');
    if (!token) return Promise.resolve();

    const role = jwtService.getRoleFromToken(token);
    return authService.getUserProfile(parseInt(jwtService.getSubFromToken(token))).toPromise()
      .then(user => {
        if (!user) {
          store.dispatch(AuthActions.logout());
          return;
        }
        store.dispatch(AuthActions.loginSuccess({ token, user, role }));
      })
      .catch(() => {
        store.dispatch(AuthActions.logout());
      });
  };
}
