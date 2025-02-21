import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import '../styles/Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <h1 className="login-header">Welcome Back</h1>
      <p className="login-subheader">Please login to continue</p>
      <div className="login-form-wrapper">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;