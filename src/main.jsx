import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { Toaster } from 'react-hot-toast'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ใส่ Client ID จำลองไปก่อน (เดี๋ยวเราค่อยไปเอาของจริงจาก Google Cloud มาใส่ทีหลังได้ครับ) */}
    <GoogleOAuthProvider clientId="1087242818140-n8805mtsskl2sdbtepodirvudd0nj0tg.apps.googleusercontent.com">
      <Toaster position="top-right" />
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)