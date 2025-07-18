import { favoritesSlice } from './slice';

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
