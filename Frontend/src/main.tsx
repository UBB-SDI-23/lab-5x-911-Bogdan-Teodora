import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
export const GlobalURL="https://13.50.250.44";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
//TODO : intreb pe chatcpt ca daca am codul in vs code pt site si eu am facut deplyment in netlify 
//cum pot sa fac sa imi apara cand dau run din vs code site.ul de la netlify si nu localhost:number       