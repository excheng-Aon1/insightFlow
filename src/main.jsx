import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'

// Auto-update Service Worker & purge legacy caches on mobile browsers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if ('caches' in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => {
          if (key !== 'insightflow-executive-v6') {
            caches.delete(key).catch(() => {})
          }
        })
      }).catch(() => {})
    }
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        reg.update().catch(() => {})
      })
      .catch(() => {})
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1087242818140-n8805mtsskl2sdbtepodirvudd0nj0tg.apps.googleusercontent.com">
      <Toaster position="top-right" />
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)