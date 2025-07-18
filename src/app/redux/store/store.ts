import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { contactsMiddleware, contactsReducer, contactsReducerPath } from '../contacts';
import { favoritesReducer } from '../favorites';
import { groupsMiddleware, groupsReducer, groupsReducerPath } from '../groups';
import { filtersReducer } from '../filters';

const rootReducer = combineReducers({
  [contactsReducerPath]: contactsReducer,
  [groupsReducerPath]: groupsReducer,
  favorites: favoritesReducer,
  filters: filtersReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsMiddleware, groupsMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
