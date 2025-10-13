import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import rootDir from "../utils/rootpath.js";
import path from "path"
import { jwtMiddleware ,generatetoken} from "../middlewares/jwt.js";
import jwt from "jsonwebtoken"
import { response } from "express";
import fs from "fs"
export const createStudent = async (req, res) => { 
  const file=req.file
  const { name, password, email } = req.body; 
  console.log(req.file.buffer.toString("base64"));
    const newStudent = new Student({ 
      name, 
      password,   // ✅ store hashed password
      email ,
      photo:req.file.path
    });

    await newStudent.save()
      .then(student => {
        const token= generatetoken({
        id:student.id,
        email:student.email
      })
    
        res.status(201).json({ 
          success: true, 
          message: "Student is created successfully", 
          student
        });
      })
      .catch(error => res.status(500).json({ error: error.message }));
     
    }

export const getStudents = async(req, res) => {
    const students=await Student.find().select("-password");
    res.status(200).json(students);
};
export const updateStudent = async (req, res) => {
    const {id}=req.params;
    const {name,password,email}=req.body;
        const updatedStudent=await Student.findByIdAndUpdate(id,{name,password,email}, {new: true});
    res.status(200).json(updatedStudent);
};
export const deleteStudent = async (req, res) => {
    const {id}=req.params;
    await Student.findByIdAndDelete(id);
    res.status(204).send();
};
export const loginform = (req,res,next) =>{
    res.sendFile(path.join(rootDir,"views","loginform.html"))
}
export const loginpost = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await Student.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Password does not match" });
    }

    // Create payload and token
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = generatetoken(payload);

    res.json({
      success: true,
      message: "Login successful and token generated",
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
