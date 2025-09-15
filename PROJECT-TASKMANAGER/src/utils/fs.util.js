import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);
const tasksFilePath = path.join(__dirname,  'data', 'tasks.json');
console.log(tasksFilePath);
export const readTasks =  () => {
    ensureFileExists();
    try {
        const data = fs.readFileSync(tasksFilePath, 'utf-8');
        return JSON.parse(data) || [];
    } catch (error) {
        console.error('Error reading tasks:', error);
        return [];
    }
};

export const writeTasks =  (tasks) => {
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error writing tasks:', error);
    }   

};
const ensureFileExists = () => {
    const dir = path.dirname(tasksFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(tasksFilePath)) {
        fs.writeFileSync(tasksFilePath, JSON.stringify([]));
    }       
};