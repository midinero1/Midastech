import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SiteProvider } from '../i18n'
import t from '../copy/en'
import Shell from '../Chrome'
import Story from '../pages/Story'
import '../violife.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider lang="en" page="story" t={t}>
      <Shell>
        <Story />
      </Shell>
    </SiteProvider>
  </StrictMode>,
)
