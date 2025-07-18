import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { FilterFormValues } from '../../../components/FilterForm';

const initialState = {
  name: '',
  groupId: ''
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setContactsFilter: (state, action: PayloadAction<Partial<FilterFormValues>>) => {
      Object.assign(state, action.payload);
    },
    clearContactsFilter: state => {
      state.name = '';
      state.groupId = '';
    }
  }
});
