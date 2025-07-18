import { createStore, combineReducers, applyMiddleware } from 'redux';
import { contactsReducer } from './../reducers/contactsReducers';
import { favoritesReducer } from './../reducers/favoritesReducers';
import { groupsReducer } from './../reducers/groupsReducers';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { ContactsActions } from './../actions/contactsActions';
import { FavoritesActions } from './../actions/favoritesActions';
import { GroupsActions } from './../actions/groupsActions';
import { logActionMiddleware } from './../logActionMiddleware';
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  favorites: favoritesReducer,
  groups: groupsReducer
});

// @ts-ignore
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logActionMiddleware))
);

export type RootState = ReturnType<typeof rootReducer>;
export type AllActions = ContactsActions | FavoritesActions | GroupsActions;
export type AppDispatch = ThunkDispatch<RootState, void, AllActions>;
