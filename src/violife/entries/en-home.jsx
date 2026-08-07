import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SiteProvider } from '../i18n'
import t from '../copy/en'
import Shell from '../Chrome'
import Home from '../pages/Home'
import '../violife.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider lang="en" page="home" t={t}>
      <Shell>
        <Home />
      </Shell>
    </SiteProvider>
  </StrictMode>,
)
