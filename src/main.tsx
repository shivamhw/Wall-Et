import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material'
import { pink, purple } from '@mui/material/colors'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
      primary: purple,
      secondary: pink,
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
       <App />
    </ThemeProvider>
  </StrictMode>,
)
