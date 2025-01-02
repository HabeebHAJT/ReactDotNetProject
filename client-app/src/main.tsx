import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App/Layout/App'
import 'semantic-ui-css/semantic.min.css'
import './App/Layout/style.css'
import { store, StoreContext } from './App/Store/store'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StoreContext.Provider value={store}>
            <App />
        </StoreContext.Provider>
   
  </StrictMode>,
)
