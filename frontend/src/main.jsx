import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: "var(--cardMain)", contrastText: "var(--textLight)" },
    secondary: { main: "var(--button)", contrastText: "var(--textLight)" },
    background: { default: "var(--bgMain)" },
    text: { primary: "var(--textDark)", secondary: "var(--textLight)" },
  }
});
  
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
