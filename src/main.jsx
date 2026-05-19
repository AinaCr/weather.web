import { StrictMode } from 'react'
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
