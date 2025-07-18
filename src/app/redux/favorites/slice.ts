import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
  contactIds: string[];
}

const initialState: FavoritesState = {
  contactIds: [
    'ecd667da-0513-4dd5-ba50-e7cc69f6573c',
    '84465d40-ef7b-41c7-8de4-29e7fb4ddd21',
    '5dd152ab-d6ab-4a71-844c-17c2d7cc7543'
  ]
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.contactIds.includes(action.payload)) {
        state.contactIds.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.contactIds = state.contactIds.filter(id => id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const contactId = action.payload;
      if (state.contactIds.includes(contactId)) {
        state.contactIds = state.contactIds.filter(id => id !== contactId);
      } else {
        state.contactIds.push(contactId);
      }
    }
  }
});
