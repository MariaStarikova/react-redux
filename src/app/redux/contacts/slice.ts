import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ContactDto, Response } from '../../../types';

export const contactsSlice = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fs.gcfiles.net' }),
  tagTypes: ['contacts'],
  endpoints: builder => ({
    getContacts: builder.query<Response<ContactDto[]>, void>({
      query() {
        return {
          url: '/fileservice/file/download/a/177331/sc/280/h/3f9021c6ea91fc0306ceb0e9c2f2e56c.json'
        };
      },
      providesTags: ['contacts']
    })
  })
});
