import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SiteProvider } from '../i18n'
import t from '../copy/en'
import Shell from '../Chrome'
import Find from '../pages/Find'
import '../violife.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider lang="en" page="find" t={t}>
      <Shell>
        <Find />
      </Shell>
    </SiteProvider>
  </StrictMode>,
)
