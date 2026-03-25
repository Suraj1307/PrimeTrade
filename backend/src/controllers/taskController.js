const mongoose = require("mongoose");
const Task = require("../models/Task");
const sendResponse = require("../utils/response");

const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      createdBy: req.user._id
    });

    return sendResponse(res, 201, true, "Task created successfully", task);
  } catch (error) {
    next(error);
  }
};

const getUserTasks = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { createdBy: req.user._id };

    const tasks = await Task.find(query)
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    const message =
      req.user.role === "admin" ? "All tasks fetched" : "User tasks fetched";

    return sendResponse(res, 200, true, message, tasks);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid task id", null);
    }

    const task = await Task.findById(id);

    if (!task) {
      return sendResponse(res, 404, false, "Task not found", null);
    }

    const isOwner = task.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return sendResponse(res, 403, false, "You can update only your own tasks", null);
    }

    ["title", "description", "status"].forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });

    await task.save();

    return sendResponse(res, 200, true, "Task updated successfully", task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid task id", null);
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return sendResponse(res, 404, false, "Task not found", null);
    }

    return sendResponse(res, 200, true, "Task deleted successfully", task);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask
};
