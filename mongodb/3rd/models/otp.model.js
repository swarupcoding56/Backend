import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expires: { type: Date, required: true }
});

const otpmodel=mongoose.model("otp",otpSchema);
export default otpmodel;