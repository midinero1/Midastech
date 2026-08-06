import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Logos from './Logos'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Logos />
  </StrictMode>,
)
