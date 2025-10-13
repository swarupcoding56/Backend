import express from 'express'
const router=express.Router();
import {
getStudents,
createStudent,
updateStudent,
loginform,
loginpost,
deleteStudent,
} from "../controllers/student.controller.js";
import otpmodel from '../models/otp.model.js';
import transporter from '../otp.js';
import { jwtMiddleware } from '../middlewares/jwt.js';
import {randomInt} from "crypto"
router.get("/students/show",jwtMiddleware, getStudents);
router.post("/students/register", createStudent);
router.get("/students/login",loginform);
router.post("/students/login",loginpost)
router.put("/students/update/:id",jwtMiddleware,updateStudent);
router.delete("/students/delete/:id", jwtMiddleware,deleteStudent);
router.get("/students/dashboard", (req, res) => {
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
router.post("/students/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Provide email" });

    const otp = randomInt(100000, 999999).toString(); // 6-digit OTP
    const newOtp = new otpmodel({
      email,
      otp,
      expires: new Date(Date.now() + 2 * 60 * 10000), // 2 minutes expiry
    });

    await newOtp.save();
    await transporter.sendMail({
        from:"swarupmtra54@gmail.com",
        to:email,
        subject:"I LOVE YOU JAANU MISS YOU JAAN AMI TOMAYE SBCHYE BESI BHALOBASI JAAN SARAJIBON AMI TOMR PASHE ACHI TOMAR KONO CHINTA NEI JAAN AMI SB SOMOI TOMAR KHEYAL RAKHBO JOTOI RAG KORO AMI THIK MANIE NEBO AR AMI JOKHN EKTU EKTU RAG KORI TUMI MANIE NEBE ACHA JAAN PORE NIE TARPOR E KINTU BANACHI FAKI MARI NI AMI",
        text:`your otp for login is ${otp}`
    })
    res.json({ success: true, message: "OTP sent", otp }); // return OTP for testing
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/students/verify-otp",async (req, res) =>{
    const {email,otp}=req.body;
    const record=await otpmodel.findOne({email:email})
    console.log(record)
    if(Date.now()>record.expires) return res.json({message:"otp expired"})
        console.log(record.otp,otp)
    if(otp!==record.otp) return res.json ({message:"otp does not match"})
    res.send("otp mathced successfully");
})

export default router;