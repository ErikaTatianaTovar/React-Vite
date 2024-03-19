import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
        reducerPath: "api",
        baseQuery: fetchBaseQuery({ 
            baseUrl: "http://localhost:3000" 
        }),
        endpoints: (builder) => ({
            getUsers: builder.query({
                query: () => `/user`,
                providesTags:["Users"], // funcion que se ejecuta al hacer un llamado en conjunto con el 
                transformResponse: (response) => 
                response.sort((a, b) => b._id - a._id), //transforma y recoge
            }),
            createUser:builder.mutation({
                query:(newUser) => ({
                    url: `/user`,
                    method: 'POST',
                    body: newUser
                })
            })
        }),
    })
//para exportar el nombre de la funcion se pone despues de use y antes de query y en camelcase, 
//ejemplo la funcion holaMundo quedaria useHolaMundoQuery
export const { useGetUsersQuery, useCreateUserMutation } = apiSlice
