import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/themes.css'
import App from './App.tsx'
import { initializeAnalytics } from './utils/analytics'
import { ThemeProvider } from './contexts/ThemeContext'
import './i18n/i18n' // Initialize i18n

// אתחול Analytics
initializeAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
