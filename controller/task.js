// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Create a task
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    task.userId = req.user?._id
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllTask = async (req, res) => {
    try {
      const tasks = await Task.find({userId:req.user?._id}).sort({ createdAt: -1 });
      res.status(200).json(tasks.reverse());
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

// Update task completion status by task ID
exports.updateTaskStatus = async (req, res) => {
    const taskId = req.params.taskId;
     console.log('taaskid.....................',taskId)
    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { completed: true }, // Set completed to true directly
        { new: true }
      );
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};

// Delete a task by task ID
exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const task = await Task.findByIdAndRemove(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(204).send({ message: 'Task deleted successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

