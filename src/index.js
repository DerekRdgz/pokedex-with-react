import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Team from './Pages/Team';
import About from './Pages/About';
import Profile from './Pages/Profile';
import SignIn from './components/login'; // Adjust if your sign-in component is located elsewhere
import { AuthProvider } from './components/AuthContext'; // Adjust the import path as needed
import ProtectedRoute from './components/ProtectedRoutes'; // Adjust the import path as needed
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/" element={<ProtectedRoute><App/></ProtectedRoute>} />
          <Route path="/Home" element={<ProtectedRoute><App/></ProtectedRoute>} />
          <Route path="/Team" element={<ProtectedRoute><Team/></ProtectedRoute>} />
          <Route path="/Profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path="/About" element={<ProtectedRoute><About/></ProtectedRoute>} />
          {/* Redirect all other paths to SignIn */}
          <Route path="*" element={<Navigate replace to="/SignIn" />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
