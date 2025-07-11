const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { createTaskSchema, updateTaskSchema, validateWith } = require("../validators/taskValidator");

router.route("/")
  .get(getTasks)
  .post(validateWith(createTaskSchema), createTask);

router.route("/:id")
  .put(validateWith(updateTaskSchema), updateTask)
  .delete(deleteTask);

module.exports = router;
