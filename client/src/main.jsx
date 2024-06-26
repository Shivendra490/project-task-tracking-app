import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BoardProvider from './store/BoardProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BoardProvider>
    <App />
  </BoardProvider>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
)
