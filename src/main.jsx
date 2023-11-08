import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './styles/style.css'
import './styles/home.css'
import './styles/error.css'
import './styles/login.css'
import { allBooks } from './context/api.js';

// allBooks()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
