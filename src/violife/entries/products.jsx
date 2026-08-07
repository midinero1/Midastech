import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Shell from '../Chrome'
import Products from '../pages/Products'
import '../violife.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Shell page="products">
      <Products />
    </Shell>
  </StrictMode>,
)
