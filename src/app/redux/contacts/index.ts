import { contactsSlice } from './slice';

export const contactsReducer = contactsSlice.reducer;
export const contactsReducerPath = contactsSlice.reducerPath;
export const contactsMiddleware = contactsSlice.middleware;

export const { useGetContactsQuery } = contactsSlice;
