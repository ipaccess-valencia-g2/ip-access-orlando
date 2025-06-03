import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';


const routes = [
    {
      path: '/',
      element: <Navigate to="/admin/check-in" replace />,
    },
    {
      path: '/admin/check-in',
      element: <AdminPage />,
    },
  ];
  

export default routes;
