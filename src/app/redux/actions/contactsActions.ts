import { ThunkAction } from 'redux-thunk';
import { FilterFormValues } from '../../../components/FilterForm';
import { ContactDto } from '../../../types/dto/ContactDto';
import { RootState } from '../store/store';

export const FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE';
export const SET_CONTACTS_FILTER = 'SET_CONTACTS_FILTER';
export const CLEAR_CONTACTS_FILTER = 'CLEAR_CONTACTS_FILTER';

interface FetchContactsRequestAction {
  type: typeof FETCH_CONTACTS_REQUEST;
}

interface FetchContactsSuccessAction {
  type: typeof FETCH_CONTACTS_SUCCESS;
  payload: ContactDto[];
}

interface FetchContactsFailureAction {
  type: typeof FETCH_CONTACTS_FAILURE;
  payload: string;
}

interface SetContactsFilterAction {
  type: typeof SET_CONTACTS_FILTER;
  payload: Partial<FilterFormValues>;
}

interface ClearContactsFilterAction {
  type: typeof CLEAR_CONTACTS_FILTER;
}

export function fetchContactsRequest(): FetchContactsRequestAction {
  return { type: FETCH_CONTACTS_REQUEST };
}

export function fetchContactsSuccess(contacts: ContactDto[]): FetchContactsSuccessAction {
  return { type: FETCH_CONTACTS_SUCCESS, payload: contacts };
}

export function fetchContactsFailure(error: string): FetchContactsFailureAction {
  return { type: FETCH_CONTACTS_FAILURE, payload: error };
}

export function setContactsFilter(filter: Partial<FilterFormValues>): SetContactsFilterAction {
  return { type: SET_CONTACTS_FILTER, payload: filter };
}

export function clearContactsFilter(): ClearContactsFilterAction {
  return { type: CLEAR_CONTACTS_FILTER };
}

export function fetchContacts(): ThunkAction<void, RootState, void, ContactsActions> {
  return async dispatch => {
    dispatch(fetchContactsRequest());
    try {
      const res = await fetch('https://9c6b00db2da0cb3e.mokky.dev/contacts');
      const data = await res.json();

      dispatch(fetchContactsSuccess(data));
    } catch (error) {
      dispatch(fetchContactsFailure('Ошибка загрузки контактов'));
    }
  };
}

export type ContactsActions =
  | FetchContactsRequestAction
  | FetchContactsSuccessAction
  | FetchContactsFailureAction
  | SetContactsFilterAction
  | ClearContactsFilterAction;
