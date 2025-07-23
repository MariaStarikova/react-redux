import { makeAutoObservable } from 'mobx';
import { ContactDto } from '../../types';
import { api } from '../../api';

export const contactsStore = makeAutoObservable({
  contacts: [] as ContactDto[],
  loading: false,
  error: null as string | null,
  *get() {
    contactsStore.loading = true;
    contactsStore.error = null;
    try {
      contactsStore.contacts = yield api.getContacts();
    } catch (error) {
      contactsStore.error = error instanceof Error ? error.message : 'Произошла неизвестная ошибка';
    }
    contactsStore.loading = false;
  }
});
