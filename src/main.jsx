import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import cartStore from './redux/cartStore.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={cartStore}>
        <GoogleOAuthProvider clientId='867000557105-6r1480s9oc9adip59hqetk255gnk70bq.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>
        
      </Provider>

    </BrowserRouter>

  </StrictMode>,
)
