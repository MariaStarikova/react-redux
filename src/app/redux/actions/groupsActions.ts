import { ThunkAction } from 'redux-thunk';
import { GroupContactsDto } from '../../../types/dto/GroupContactsDto';
import { RootState } from '../store/store';

export const FETCH_GROUPS_REQUEST = 'FETCH_GROUPS_REQUEST';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
export const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE';

interface FetchGroupsRequestAction {
  type: typeof FETCH_GROUPS_REQUEST;
}

interface FetchGroupsSuccessAction {
  type: typeof FETCH_GROUPS_SUCCESS;
  payload: GroupContactsDto[];
}

interface FetchGroupsFailureAction {
  type: typeof FETCH_GROUPS_FAILURE;
  payload: string;
}

export function fetchGroupsRequest(): FetchGroupsRequestAction {
  return { type: FETCH_GROUPS_REQUEST };
}

export function fetchGroupsSuccess(groups: GroupContactsDto[]): FetchGroupsSuccessAction {
  return { type: FETCH_GROUPS_SUCCESS, payload: groups };
}

export function fetchGroupsFailure(error: string): FetchGroupsFailureAction {
  return { type: FETCH_GROUPS_FAILURE, payload: error };
}

export function fetchGroups(): ThunkAction<void, RootState, void, GroupsActions> {
  return async dispatch => {
    dispatch(fetchGroupsRequest());

    try {
      const res = await fetch('https://9c6b00db2da0cb3e.mokky.dev/groups');
      const data = await res.json();

      dispatch(fetchGroupsSuccess(data));
    } catch (error) {
      dispatch(fetchGroupsFailure('Ошибка загрузки групп'));
    }
  };
}

export type GroupsActions =
  | FetchGroupsRequestAction
  | FetchGroupsSuccessAction
  | FetchGroupsFailureAction;
