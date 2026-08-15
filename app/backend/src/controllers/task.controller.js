const taskService = require("../services/task.service");
const { z } = require("zod");

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
});

const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.user.userId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.userId);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    const task = await taskService.createTask(req.user.userId, validatedData);
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const validatedData = taskSchema.partial().parse(req.body);
    const task = await taskService.updateTask(
      req.params.id,
      req.user.userId,
      validatedData,
    );
    if (!task)
      return res.status(404).json({ error: "Task not found or unauthorized" });
    res.json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.deleteTask(req.params.id, req.user.userId);
    if (!task)
      return res.status(404).json({ error: "Task not found or unauthorized" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
