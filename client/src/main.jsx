import { StrictMode } from 'react' 
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
          duration: 3000,
          style: {
              borderRadius: "12px",
              background: "#333",
              color: "#fff",
          },
          success: {
              iconTheme: {
                  primary: "#10B981",
                  secondary: "#fff",
              },
          },
          error: {
              iconTheme: {
                  primary: "#EF4444",
                  secondary: "#fff",
              },
          },
      }}
    />
  </StrictMode>,
)

