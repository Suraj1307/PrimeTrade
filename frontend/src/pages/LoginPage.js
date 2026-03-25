import React from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = ({ onLogin }) => {
  return (
    <div className="page-section">
      <AuthForm title="Login" buttonText="Login" onSubmit={onLogin} />
    </div>
  );
};

export default LoginPage;
