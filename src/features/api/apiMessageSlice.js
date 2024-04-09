import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getApiBaseUrl from "./api";

export const apiMessageSlice = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "/Messages",
    }),
    createMessage: builder.mutation({
      query: (newMessage) => ({
        url: `/Message`,
        method: "POST",
        body: newMessage,
      }),
    }),
  }),
});
export const { useGetMessagesQuery, useCreateMessageMutation } =
  apiMessageSlice;
