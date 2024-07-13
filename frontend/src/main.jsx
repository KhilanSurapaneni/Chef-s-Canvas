import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider for context management
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SearchProvider } from "./contexts/SearchContext"

// Configure Axios to include credentials globally, allows us to use cookies
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SearchProvider>
          <BrowserRouter>
            <App />
            <ToastContainer 
              position="bottom-right"
              autoClose={750}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
