// LoginPage.jsx
// Login screen — wraps LoginForm and handles routing after login.

import React from 'react';
import LoginForm from '../forms/LoginForm';
import './styles/LoginPage.css';

const LoginPage = () => {

  return (
    <div className="login-container justify-content-center align-items-center text-center mt-5" >
      <h1 className='login-title'>Login</h1>
      <LoginForm />
      <p className="text-muted mb-2">Forgot password?</p>
      <p className="mb-0">
        Don’t have an account?{' '}
        <span className="signup-link">
          <strong>  Sign up  </strong>
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
