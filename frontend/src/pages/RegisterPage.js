import React from "react";
import AuthForm from "../components/AuthForm";

const RegisterPage = ({ onRegister }) => {
  return (
    <div className="page-section">
      <AuthForm
        title="Create account"
        buttonText="Register"
        onSubmit={onRegister}
        includeName
        includeRole
      />
    </div>
  );
};

export default RegisterPage;
