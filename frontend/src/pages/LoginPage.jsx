// LoginPage.jsx
// Login screen — wraps LoginForm and handles routing after login.

import React from 'react';
import LoginForm from '../forms/LoginForm';

const LoginPage = () => {
  return (
    <div className="register-page-container" style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
