import type { AnyAction, Middleware } from 'redux';
import { RootState } from './store/store';
import { logAction } from '../metrics/logAction';

export const logActionMiddleware: Middleware<{}, RootState> = storeAPI => {
  return function wrapDispatch(next) {
    return function handleAction(action: unknown) {
      logAction(action as AnyAction);
      return next(action);
    };
  };
};
