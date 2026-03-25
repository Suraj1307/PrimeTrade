import React, { useEffect, useState } from "react";

const defaultTask = {
  title: "",
  description: "",
  status: "pending"
};

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [taskData, setTaskData] = useState(defaultTask);

  useEffect(() => {
    if (editingTask) {
      setTaskData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "pending"
      });
    } else {
      setTaskData(defaultTask);
    }
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(taskData, () => setTaskData(defaultTask));
  };

  return (
    <form className="card task-form" onSubmit={handleSubmit}>
      <h3>{editingTask ? "Update Task" : "Create Task"}</h3>
      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={taskData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Task description"
        rows="4"
        value={taskData.description}
        onChange={handleChange}
      />
      <select name="status" value={taskData.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <div className="task-form-actions">
        <button type="submit">{editingTask ? "Save Changes" : "Add Task"}</button>
        {editingTask && (
          <button type="button" className="secondary-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
