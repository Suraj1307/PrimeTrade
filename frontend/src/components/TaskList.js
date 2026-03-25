import React from "react";

const TaskList = ({ tasks, onEdit, onDelete, currentUser }) => {
  if (!tasks.length) {
    return (
      <div className="card empty-state">
        <p>No tasks found yet. Add one to test the API flow.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="card task-card" key={task._id}>
          <div className="task-card-top">
            <div>
              <h4>{task.title}</h4>
              <span className={`badge ${task.status}`}>{task.status}</span>
            </div>
            <small>
              {task.createdBy?.name ? `By ${task.createdBy.name}` : "Your task"}
            </small>
          </div>

          <p>{task.description || "No description added."}</p>

          <div className="task-actions">
            <button onClick={() => onEdit(task)}>Edit</button>
            {currentUser?.role === "admin" && (
              <button className="danger-btn" onClick={() => onDelete(task._id)}>
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
