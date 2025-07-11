import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Import the App component which includes routing
import './main.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />  {/* Replace LoginForm with App */}
  </StrictMode>
);
