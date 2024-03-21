import { configureStore } from '@reduxjs/toolkit';
import numberReducer from './features/numberSlice';
import usersReducer from './features/userSlice';
import { apiSlice } from './features/api/apiSlice';

//todos los store que yo tenga tengo que agregarlos dentro de 
//reducer para que el sepa que tiene que estar cambiando los valores de esa variable

//agrupar estados en una sola ubicación
const store = configureStore({
    reducer: {
        number: numberReducer,
        users: usersReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
},
        middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    
})

export default store;