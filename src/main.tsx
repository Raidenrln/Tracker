import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import './styles/font.css'
import App from './App.tsx'
import { SideBarProvider } from './context/SideBarContext.tsx'
import { StoreProvider } from './context/StoreContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     <SideBarProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
     </SideBarProvider>
    </BrowserRouter>
  </StrictMode>,
)
