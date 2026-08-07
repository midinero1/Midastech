import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Shell from '../Chrome'
import Story from '../pages/Story'
import '../violife.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Shell page="story">
      <Story />
    </Shell>
  </StrictMode>,
)
