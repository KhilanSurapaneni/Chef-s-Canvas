import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from './AuthContext'; // Import AuthProvider for context management
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure Axios to include credentials globally, allows us to use cookies
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
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
    </AuthProvider>
  </React.StrictMode>
);
