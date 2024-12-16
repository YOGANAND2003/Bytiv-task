// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); 
// Initialize the app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());


// Connect to MongoDB using the connection string from environment variables
const mongoURI = process.env.MONGO_URI;  // MongoDB URI from .env

mongoose.connect(mongoURI).then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Task schema and model
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }
});

const Task = mongoose.model('Task', taskSchema);


// Routes

// 1. POST /tasks: Create a new task
app.post('/addtask', async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task', details: err.message });
    }
});

// 2. GET /tasks: Fetch all tasks
app.get('/gettasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
    }
});

// 3. GET /tasks/:id: Fetch a task by its ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch task', details: err.message });
    }
});

// 4. PUT /tasks/:id: Update the task status
app.put('/task/update/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['pending', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task', details: err.message });
    }
});

// 5. DELETE /tasks/:id: Delete a task by its ID
app.delete('/deletetask/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task', details: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
