import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Shell from '../Chrome'
import Recipes from '../pages/Recipes'
import '../violife.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Shell page="recipes">
      <Recipes />
    </Shell>
  </StrictMode>,
)
