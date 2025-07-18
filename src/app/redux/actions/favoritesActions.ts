export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

interface AddToFavoritesAction {
  type: typeof ADD_TO_FAVORITES;
  payload: string;
}

interface RemoveFromFavoritesAction {
  type: typeof REMOVE_FROM_FAVORITES;
  payload: string;
}

interface ToggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE;
  payload: string;
}

export function addToFavorites(contactId: string): AddToFavoritesAction {
  return { type: ADD_TO_FAVORITES, payload: contactId };
}

export function removeFromFavorites(contactId: string): RemoveFromFavoritesAction {
  return { type: REMOVE_FROM_FAVORITES, payload: contactId };
}

export function toggleFavorite(contactId: string): ToggleFavoriteAction {
  return { type: TOGGLE_FAVORITE, payload: contactId };
}

export type FavoritesActions =
  | AddToFavoritesAction
  | RemoveFromFavoritesAction
  | ToggleFavoriteAction;
