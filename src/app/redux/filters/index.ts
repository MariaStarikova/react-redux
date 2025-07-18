import { filtersSlice } from './slice';

export const { setContactsFilter, clearContactsFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
