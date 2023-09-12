// routes/user.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { loginUser, createUser } = require('../controller/user');

// Create a new user
router.post('/register',createUser);

// User login
router.post('/login', loginUser);

module.exports = router;
