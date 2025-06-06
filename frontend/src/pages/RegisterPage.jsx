// RegisterPage.jsx
// Page for new users to sign up — wraps RegisterForm.

import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import './styles/RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-container" >
      <h1>Create an Account</h1>
      <RegisterForm />
      <p className="login-link">
          Already Have Account? <a href="/login">Login</a>
        </p>
    </div>
  );
};

export default RegisterPage;
