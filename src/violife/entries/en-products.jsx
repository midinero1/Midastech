import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SiteProvider } from '../i18n'
import t from '../copy/en'
import Shell from '../Chrome'
import Products from '../pages/Products'
import '../violife.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider lang="en" page="products" t={t}>
      <Shell>
        <Products />
      </Shell>
    </SiteProvider>
  </StrictMode>,
)
