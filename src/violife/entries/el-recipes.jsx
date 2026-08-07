import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SiteProvider } from '../i18n'
import t from '../copy/el'
import Shell from '../Chrome'
import Recipes from '../pages/Recipes'
import '../violife.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider lang="el" page="recipes" t={t}>
      <Shell>
        <Recipes />
      </Shell>
    </SiteProvider>
  </StrictMode>,
)
