import express from 'express';
import mongoose from 'mongoose';
import userModel from '../model/user.model.js';

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new userModel({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true, runValidators: true } // fixed options
    );

    if (!updatedUser) {
      return res.status(401).json({
        successs: false,
        message: `User with id ${id} not found`
      });
    }

    res.json({
        success: true,
        user: updatedUser,
        message: "User updated successfully"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user id" });
  }
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
