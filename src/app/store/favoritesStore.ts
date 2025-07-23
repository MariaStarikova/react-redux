import { makeAutoObservable } from 'mobx';

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

export const favoritesStore = makeAutoObservable({
  contactIds: initialState.contactIds,

  addToFavorites(contactId: string) {
    if (!this.contactIds.includes(contactId)) {
      this.contactIds.push(contactId);
    }
  },

  removeFromFavorites(contactId: string) {
    this.contactIds = this.contactIds.filter(id => id !== contactId);
  },

  toggleFavorite(contactId: string) {
    if (this.contactIds.includes(contactId)) {
      this.removeFromFavorites(contactId);
    } else {
      this.addToFavorites(contactId);
    }
  }
});
