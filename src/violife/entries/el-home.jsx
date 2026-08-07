import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SiteProvider } from '../i18n'
import t from '../copy/el'
import Shell from '../Chrome'
import Home from '../pages/Home'
import '../violife.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider lang="el" page="home" t={t}>
      <Shell>
        <Home />
      </Shell>
    </SiteProvider>
  </StrictMode>,
)
