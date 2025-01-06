import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './App/Layout/style.css'
import { store, StoreContext } from './App/Store/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './App/Router/Routers'
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.min.css";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StoreContext.Provider value={store}>
            <RouterProvider router={router} />
        </StoreContext.Provider>
   
  </StrictMode>,
)
