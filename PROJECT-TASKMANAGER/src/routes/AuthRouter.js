import {Router} from 'express';
import {login,logout} from '../controller/auth.contoller.js';
const router=Router();

// Define your authentication routes here
router.post('/login',login);
router.get('/logout',logout);

export default router;