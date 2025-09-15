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
export const updateTask = async (req, res) => {};
export const deleteTask = async (req, res) => {};