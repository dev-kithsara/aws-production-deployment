const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const authenticateToken = require("../middleware/auth.middleware");

router.use(authenticateToken); // Protect all task routes

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
