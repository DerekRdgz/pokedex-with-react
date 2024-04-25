import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser) {
    // If the user is not logged in, redirect to SignIn page
    return <Navigate to="/SignIn" />;
  }
  
  return children; // If the user is logged in, render the children components
};

export default ProtectedRoute;
