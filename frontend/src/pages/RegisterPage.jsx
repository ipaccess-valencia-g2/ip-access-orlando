// RegisterPage.jsx
// Page for new users to sign up — wraps RegisterForm.

import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import './styles/RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page-container" style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h1>Create an Account</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
