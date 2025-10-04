import express from 'express'
const router=express.Router();
import { checkauth,checkguest } from '../middlewares/auth.js';
import passport from 'passport';
import {
getStudents,
createStudent,
updateStudent,
loginform,
deleteStudent,
} from "../controllers/student.controller.js";
router.get("/students/show",checkauth, getStudents);
router.post("/students/register", createStudent);
router.get("/students/login",checkguest,loginform);
router.post("/students/login",passport.authenticate("local",{
    successRedirect:"/api/students/dashboard",
    failureRedirect:"/api/students/login"
}))
router.put("/students/update/:id", checkauth,updateStudent);
router.delete("/students/delete/:id",checkauth, deleteStudent);
router.get("/students/dashboard", checkauth, (req, res) => {
    res.send("Welcome to your dashboard, " + req.user.name);
});
// Logout route
router.get("/students/logout", (req, res) => {
    req.logout(function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        req.session.destroy(() => { // destroy the session completely
            res.clearCookie('connect.sid'); // optional: clear cookie
            res.redirect("/api/students/login"); // redirect to login page
        });
    });
});

export default router;