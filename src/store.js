import { configureStore } from '@reduxjs/toolkit';
import numberReducer from './features/numberSlice';
//todos los store que yo tenga tengo que agregarlos dentro de 
//reducer para que el sepa que tiene que estar cambiando los valores de esa variable

//agrupar estados en una sola ubicación
const store = configureStore({
    reducer: {
        number: numberReducer
    }
})

export default store;