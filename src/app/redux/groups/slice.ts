import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GroupContactsDto } from '../../../types';

export const groupsSlice = createApi({
  reducerPath: 'groups',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fs.gcfiles.net' }),
  tagTypes: ['groups'],
  endpoints: builder => ({
    getGroups: builder.query<GroupContactsDto[], void>({
      query() {
        return {
          url: '/fileservice/file/download/a/177331/sc/398/h/e6c614d4c59fd9b546fb5abdfb456dd5.json'
        };
      },
      providesTags: ['groups']
    })
  })
});
