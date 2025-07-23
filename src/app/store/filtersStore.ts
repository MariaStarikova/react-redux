import { makeAutoObservable } from 'mobx';
import { FilterFormValues } from '../../components/FilterForm';

export const filtersStore = makeAutoObservable({
  name: '',
  groupId: '',

  setContactsFilter(filter: Partial<FilterFormValues>) {
    if (filter.name !== undefined) {
      filtersStore.name = filter.name;
    }
    if (filter.groupId !== undefined) {
      filtersStore.groupId = filter.groupId;
    }
  },

  clearContactsFilter() {
    filtersStore.name = '';
    filtersStore.groupId = '';
  }
});
