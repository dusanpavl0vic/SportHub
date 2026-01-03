import { Store } from '@ngrx/store';
import * as AuthActions from 'src/app/auth/store/auth.action';
import { AppState } from './app.state';

export function appInitializerFactory(
 store: Store<AppState>,
) {
 return () => {
  store.dispatch(AuthActions.checkToken());
 };
}
