import { ActionReducer } from '@ngrx/store';
import { saveToLocalStorage } from 'src/app/core/storage/storage';

export const STORAGE_KEY = 'app_state';

export function storageMetaReducer(
 reducer: ActionReducer<any>,
): ActionReducer<any> {
 return (state, action) => {
  const nextState = reducer(state, action);

  saveToLocalStorage(STORAGE_KEY, {
   auth: nextState.auth,
  });

  return nextState;
 };
}
