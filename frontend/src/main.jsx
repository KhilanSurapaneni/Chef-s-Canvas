import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from './AuthContext'; // Import AuthProvider for context management
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure Axios to include credentials globally
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
          style={{ 
            color: '#ffffff', // White text
            fontSize: '12px', // Smaller font size
            borderRadius: '8px', // Rounded corners
            boxShadow: 'none', // Remove shadow
            padding: '8px 16px', // Smaller padding
            maxWidth: '300px', // Max width
            marginTop: '10px', // Margin from the top
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
