import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

export const GlobalURL="https://lab5-carrental.netlify.app/";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
