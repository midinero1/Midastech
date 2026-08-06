import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SiteProvider } from '../i18n'
import t from '../i18n/en'
import Layout from '../components/Layout'
import About from '../pages/About'
import '../index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider lang="en" page="about" t={t}>
      <Layout>
        <About />
      </Layout>
    </SiteProvider>
  </StrictMode>,
)
