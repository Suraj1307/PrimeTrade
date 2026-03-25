import React, { useState } from "react";

const AuthForm = ({
  title,
  buttonText,
  onSubmit,
  includeName = false,
  includeRole = false
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData, () =>
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user"
      })
    );
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>{title}</h2>

      {includeName && (
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      {includeRole && (
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      )}

      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default AuthForm;
