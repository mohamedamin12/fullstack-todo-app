const { z } = require("zod");

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isCompleted: z.boolean().optional(),
});

function validateWith(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      return res.status(400).json({ error: err.errors || err.message });
    }
  };
}

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  validateWith,
};
