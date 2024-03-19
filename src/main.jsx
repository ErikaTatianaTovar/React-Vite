import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { apiSlice } from './features/api/apiSlice.js'
import{ApiProvider} from '@reduxjs/toolkit/query/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolvemos el App en el Provider de redux */}
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>,
)