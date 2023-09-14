// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 6000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://dashingshree6:kb85YfsvE5xigATA@cluster0.zisswne.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected");
});


// Use CORS middleware to handle CORS
app.use(cors());
// Middleware
app.use(express.json());

// Define your routes here
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
