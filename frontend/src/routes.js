// frontend/src/routes.js
import React from 'react';
import { Navigate } from 'react-router-dom';

import HomePage         from './pages/HomePage';
import LoginPage        from './pages/LoginPage';
import RegisterPage     from './pages/RegisterPage';
import ReservationPage  from './pages/ReservationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import UserDashboard    from './pages/UserDashboard';
import AdminPage        from './pages/AdminPage';

const routes = [
  { path: '/',             element: <HomePage />           },
  { path: '/login',        element: <LoginPage />          },
  { path: '/register',     element: <RegisterPage />       },
  { path: '/reserve',      element: <ReservationPage />    },
  { path: '/confirmation', element: <ConfirmationPage />   },
  { path: '/dashboard',    element: <UserDashboard />      },
  { path: '/admin',        element: <AdminPage />          },
  { path: '*',             element: <Navigate to='/' replace /> },
];

export default routes;
