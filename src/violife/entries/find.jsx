import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Shell from '../Chrome'
import Find from '../pages/Find'
import '../violife.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Shell page="find">
      <Find />
    </Shell>
  </StrictMode>,
)
