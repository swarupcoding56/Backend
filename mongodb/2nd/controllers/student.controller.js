import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import rootDir from "../utils/rootpath.js";
import path from "path"
export const createStudent = (req, res) => { 
  const { name, password, email } = req.body; 
  const saltrounds = 15; 

  bcrypt.hash(password, saltrounds, (err, hash) => { 
    if (err) return res.status(500).json({ error: err.message });

    const newStudent = new Student({ 
      name, 
      password: hash,   // ✅ store hashed password
      email 
    });

    newStudent.save()
      .then(student => {
        res.status(201).json({ 
          success: true, 
          message: "Student is created successfully", 
          student 
        });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
};

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