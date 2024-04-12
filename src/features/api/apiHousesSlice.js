import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getApiBaseUrl from "./api";

export const apiHousesSlice = createApi({
  reducerPath: "housesApi",
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
    getHouses: builder.query({
      query: () => "/housing",
      providesTags: ["Houses"], // Me permite ejecutar un llamado
    }),
    getHouseByCode: builder.query({
      query: (code) => "/housing/" + code,
      providesTags: ["House"],
    }),
    createHouse: builder.mutation({
      query: (newHouse) => ({
        url: "/housing",
        method: "POST",
        body: newHouse,
      }),
      invalidatesTags: ["Houses"], // Se ejecuta cuando hay un cambio en la BD
    }),
    updateHouse: builder.mutation({
      query: (house) => ({
        url: `/housing/${house.code}`,
        method: "PATCH",
        body: house,
      }),
      invalidatesTags: ["Houses", "House"],
    }),
    deleteHouse: builder.mutation({
      query: (code) => ({
        url: `/housing/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Houses"],
    }),
    uploadImage: builder.mutation({
      query: (body) => ({
        url: `/upload/${body.code}/housing`,
        method: "POST",
        body: body.file,
      }),
      invalidatesTags: ["Houses"],
    }),
  }),
});

export const {
  useGetHousesQuery,
  useGetHouseByCodeQuery,
  useCreateHouseMutation,
  useUpdateHouseMutation,
  useDeleteHouseMutation,
  useUploadImageMutation,
} = apiHousesSlice;
