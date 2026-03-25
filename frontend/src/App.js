import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  const [activePage, setActivePage] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [feedback, setFeedback] = useState({
    type: "",
    message: ""
  });

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
  };

  const saveAuthData = (responseData) => {
    localStorage.setItem("token", responseData.token);
    localStorage.setItem("user", JSON.stringify(responseData.user));
    setCurrentUser(responseData.user);
    setActivePage("dashboard");
  };

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks");
      setTasks(response.data.data || []);
    } catch (error) {
      showFeedback("error", error.response?.data?.message || "Failed to fetch tasks");
    }
  };

  const handleRegister = async (formData, resetForm) => {
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      saveAuthData(response.data.data);
      resetForm();
      showFeedback("success", response.data.message);
      fetchTasks();
    } catch (error) {
      showFeedback("error", error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async (formData, resetForm) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });
      saveAuthData(response.data.data);
      resetForm();
      showFeedback("success", response.data.message);
      fetchTasks();
    } catch (error) {
      showFeedback("error", error.response?.data?.message || "Login failed");
    }
  };

  const handleTaskSubmit = async (taskData, resetForm) => {
    try {
      if (editingTask) {
        const response = await axiosInstance.put(`/tasks/${editingTask._id}`, taskData);
        showFeedback("success", response.data.message);
      } else {
        const response = await axiosInstance.post("/tasks", taskData);
        showFeedback("success", response.data.message);
      }

      setEditingTask(null);
      resetForm();
      fetchTasks();
    } catch (error) {
      showFeedback("error", error.response?.data?.message || "Task action failed");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axiosInstance.delete(`/tasks/${taskId}`);
      showFeedback("success", response.data.message);
      fetchTasks();
    } catch (error) {
      showFeedback("error", error.response?.data?.message || "Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setTasks([]);
    setEditingTask(null);
    setActivePage("login");
    showFeedback("success", "Logged out successfully");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setActivePage("dashboard");
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser]);

  return (
    <div className="app-shell">
      <div className="hero">
        <div>
          <h1>PrimeTrade Task Manager</h1>
          <p className="hero-copy">
            A simple MERN-style project with JWT auth, role-based access, and task APIs.
          </p>
        </div>

        {!currentUser && (
          <div className="tab-row">
            <button
              className={activePage === "login" ? "tab active-tab" : "tab"}
              onClick={() => setActivePage("login")}
            >
              Login
            </button>
            <button
              className={activePage === "register" ? "tab active-tab" : "tab"}
              onClick={() => setActivePage("register")}
            >
              Register
            </button>
          </div>
        )}
      </div>

      {feedback.message && (
        <div className={`feedback ${feedback.type}`}>
          <p>{feedback.message}</p>
        </div>
      )}

      {currentUser ? (
        <DashboardPage
          currentUser={currentUser}
          tasks={tasks}
          editingTask={editingTask}
          onTaskSubmit={handleTaskSubmit}
          onTaskEdit={setEditingTask}
          onTaskDelete={handleDeleteTask}
          onCancelEdit={() => setEditingTask(null)}
          onLogout={handleLogout}
        />
      ) : activePage === "register" ? (
        <RegisterPage onRegister={handleRegister} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
