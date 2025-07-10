import { type FilterFormValues } from '../../../components/FilterForm';
import { ContactDto } from '../../../types/dto/ContactDto';
import {
  CLEAR_CONTACTS_FILTER,
  FETCH_CONTACTS_FAILURE,
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS,
  SET_CONTACTS_FILTER,
  type ContactsActions
} from '../actions/contactsActions';

export interface ContactsState {
  items: ContactDto[];
  loading: boolean;
  error: string | null;
  filter: FilterFormValues;
}

const initialState: ContactsState = {
  items: [],
  loading: false,
  error: null,
  filter: {
    name: '',
    groupId: ''
  }
};

export function contactsReducer(state = initialState, action: ContactsActions): ContactsState {
  switch (action.type) {
    case FETCH_CONTACTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case FETCH_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case SET_CONTACTS_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload
        }
      };

    case CLEAR_CONTACTS_FILTER:
      return {
        ...state,
        filter: {
          name: '',
          groupId: ''
        }
      };

    default:
      return state;
  }
}
