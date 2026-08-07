import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Shell from '../Chrome'
import Home from '../pages/Home'
import '../violife.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Shell page="home">
      <Home />
    </Shell>
  </StrictMode>,
)
