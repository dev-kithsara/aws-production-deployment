const prisma = require("../config/database");

const getTasks = async (userId) => {
  return await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

const getTaskById = async (id, userId) => {
  return await prisma.task.findFirst({
    where: { id: parseInt(id), userId },
  });
};

const createTask = async (userId, { title, description, status }) => {
  return await prisma.task.create({
    data: {
      title,
      description,
      status: status || "PENDING",
      userId,
    },
  });
};

const updateTask = async (id, userId, data) => {
  const task = await prisma.task.findFirst({
    where: { id: parseInt(id), userId },
  });

  if (!task) return null;

  return await prisma.task.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteTask = async (id, userId) => {
  const task = await prisma.task.findFirst({
    where: { id: parseInt(id), userId },
  });

  if (!task) return null;

  return await prisma.task.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
