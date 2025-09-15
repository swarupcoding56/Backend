import {Router} from 'express';
import {getallTask,createTask,updateTask,deleteTask} from '../controller/task.controller.js';
import Authmiddleware from '../middleware/auth.middleware.js';
const router=Router();
router.get('/',Authmiddleware,getallTask);
router.post('/',Authmiddleware,createTask);
router.put('/:id',Authmiddleware,updateTask);
router.delete('/:id',Authmiddleware,deleteTask);
export default router;