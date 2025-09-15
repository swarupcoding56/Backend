import { randomUUID } from 'crypto';
import {readTasks,writeTasks} from '../utils/fs.util.js';
export const getallTask = async(req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const tasks = await readTasks();
    res.json(tasks.filter(task => task.username === req.session.user.username));
};
export const createTask = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }
    const tasks = await readTasks();
    const newTask = {
        id: Date.now().toString(),
        title,
        description,
        username: req.session.user.username
    };
    tasks.push(newTask);
    await writeTasks(tasks);
    res.status(201).json(newTask);
};
export const updateTask = async (req, res) => {
 const { id } = req.params;
 console.log(Number(id));
const { title, description } = req.body;
console.log(title,description);

if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
}

let tasks = await readTasks();
console.log(tasks);

let taskIndex = tasks[Number(id)];

console.log(taskIndex);

if (!taskIndex) {
    return res.status(404).json({ message: 'Task not found' });
}

taskIndex = { 
    id: taskIndex.id, // keep original id type
    title, 
    description, 
    username: req.session.user.username 
};
tasks[Number(id)] = taskIndex;
await writeTasks(tasks);
res.json(tasks);
};
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const tasks = await readTasks();
    const updatedTasks = tasks.filter((task, index) => index !== Number(id));
    if (Number(id) >= tasks.length || Number(id) < 0) {
        return res.status(404).json({ message: 'Task not found' });
    }
    await writeTasks(updatedTasks);
    res.status(204).send();
};