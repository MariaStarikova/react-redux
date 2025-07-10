import { GroupContactsDto } from '../../../types/dto/GroupContactsDto';
import {
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAILURE,
  type GroupsActions
} from '../actions/groupsActions';

export interface GroupsState {
  items: GroupContactsDto[];
  loading: boolean;
  error: string | null;
}

const initialState: GroupsState = {
  items: [],
  loading: false,
  error: null
};

export function groupsReducer(state = initialState, action: GroupsActions): GroupsState {
  switch (action.type) {
    case FETCH_GROUPS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case FETCH_GROUPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
