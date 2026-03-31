import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#456ebb",            
      contrastText: "#f4f7ff"      
    },
    secondary: {
      main: "#14b8a6",           
      contrastText: "#f4f7ff"    
    },
    background: {
      default: "#f4f7ff",        
      paper: "#f4f7ff"             
    },
    text: {
      primary: "#2e2e2e",        
      secondary: "#f4f7ff"        
    }
  }
});

  
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);

