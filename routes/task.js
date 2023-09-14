// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { deleteTask, updateTaskStatus, getAllTask, createTask } = require('../controller/task');
const { verifyToken } = require('../controller/middleware');

// Create a task
router.post('/',verifyToken, createTask);

// Get alll tasks
router.get('/',verifyToken, getAllTask);

// Update task completion status by task ID
router.put('/status/:taskId', updateTaskStatus);

// Delete a task by task ID
router.delete('/:taskId',deleteTask);

module.exports = router;
