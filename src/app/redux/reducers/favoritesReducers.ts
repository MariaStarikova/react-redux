import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  TOGGLE_FAVORITE,
  type FavoritesActions
} from '../actions/favoritesActions';
import { FavoritesState } from '../favorites/slice';

const initialState: FavoritesState = {
  contactIds: [
    'ecd667da-0513-4dd5-ba50-e7cc69f6573c',
    '84465d40-ef7b-41c7-8de4-29e7fb4ddd21',
    '5dd152ab-d6ab-4a71-844c-17c2d7cc7543'
  ]
};

export function favoritesReducer(state = initialState, action: FavoritesActions): FavoritesState {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      if (state.contactIds.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        contactIds: [...state.contactIds, action.payload]
      };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        contactIds: state.contactIds.filter(id => id !== action.payload)
      };

    case TOGGLE_FAVORITE:
      const contactId = action.payload;
      if (state.contactIds.includes(contactId)) {
        return {
          ...state,
          contactIds: state.contactIds.filter(id => id !== contactId)
        };
      } else {
        return {
          ...state,
          contactIds: [...state.contactIds, contactId]
        };
      }

    default:
      return state;
  }
}
