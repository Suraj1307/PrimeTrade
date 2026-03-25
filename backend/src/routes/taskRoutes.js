const express = require("express");
const {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  createTaskValidation,
  updateTaskValidation
} = require("../validators/taskValidators");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTaskValidation, validateRequest, createTask);
router.get("/", getUserTasks);
router.put("/:id", updateTaskValidation, validateRequest, updateTask);
router.delete("/:id", roleMiddleware("admin"), deleteTask);

module.exports = router;
