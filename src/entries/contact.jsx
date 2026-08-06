import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '../components/Layout'
import Contact from '../pages/Contact'
import '../index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout path="/contact/">
      <Contact />
    </Layout>
  </StrictMode>,
)
