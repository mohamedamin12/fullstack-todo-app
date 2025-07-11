const Task = require("../models/Task");

//* GET /api/tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

//* POST /api/tasks
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description });
  res.status(201).json(task);
};

//* PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  const { title, description, isCompleted } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { title, description, isCompleted }, { new: true });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

//* DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json({ message: "Task deleted successfully" });
};