import { makeAutoObservable } from 'mobx';
import { GroupContactsDto } from '../../types';
import { api } from '../../api';

export const groupsStore = makeAutoObservable({
  groups: [] as GroupContactsDto[],
  loading: false,
  error: null as string | null,
  *get() {
    groupsStore.loading = true;
    groupsStore.error = null;
    try {
      groupsStore.groups = yield api.getGroups();
    } catch (error) {
      groupsStore.error = error instanceof Error ? error.message : 'Произошла неизвестная ошибка';
    }
    groupsStore.loading = false;
  }
});
