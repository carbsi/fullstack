import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'


// react 18+ sovelluksen kaynnistyspiste, StrictMode paljastaa sivuvaikutusongelmia devissa
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
