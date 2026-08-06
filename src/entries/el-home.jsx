import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SiteProvider } from '../i18n'
import t from '../i18n/el'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import '../index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider lang="el" page="home" t={t}>
      <Layout>
        <Home />
      </Layout>
    </SiteProvider>
  </StrictMode>,
)
