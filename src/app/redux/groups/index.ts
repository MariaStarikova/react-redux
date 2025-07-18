import { groupsSlice } from './slice';

export const groupsReducer = groupsSlice.reducer;
export const groupsReducerPath = groupsSlice.reducerPath;
export const groupsMiddleware = groupsSlice.middleware;

export const { useGetGroupsQuery } = groupsSlice;
