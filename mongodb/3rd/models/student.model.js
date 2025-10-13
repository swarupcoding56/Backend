import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// ✅ Pre-save hook for hashing password
studentSchema.pre("save", async function (next) {
  // Skip hashing if password is unchanged
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // generate salt
    this.password = await bcrypt.hash(this.password, salt); // hash the password
    next();
  } catch (err) {
    next(err);
  }
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
