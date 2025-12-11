import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store'

const BASE_URL = import.meta.env.VITE_API_URL


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  }
  }),
  tagTypes: ['Projects', 'Images', 'Auth', "Blogs", "BlogsImages"],
  endpoints: () => ({}),
})
