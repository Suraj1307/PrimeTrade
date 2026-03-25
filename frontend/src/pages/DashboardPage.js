import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const DashboardPage = ({
  currentUser,
  tasks,
  editingTask,
  onTaskSubmit,
  onTaskEdit,
  onTaskDelete,
  onCancelEdit,
  onLogout
}) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header card">
        <div>
          <h2>Dashboard</h2>
          <p>
            Logged in as <strong>{currentUser?.name}</strong> ({currentUser?.role})
          </p>
        </div>
        <button className="secondary-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <TaskForm
        onSubmit={onTaskSubmit}
        editingTask={editingTask}
        onCancel={onCancelEdit}
      />

      <TaskList
        tasks={tasks}
        onEdit={onTaskEdit}
        onDelete={onTaskDelete}
        currentUser={currentUser}
      />
    </div>
  );
};

export default DashboardPage;
