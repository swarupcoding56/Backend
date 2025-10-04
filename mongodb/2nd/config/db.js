import mongoose from "mongoose";
const mongoose_URI="mongodb://localhost:27017/new2";
export const connectDB=()=>{
    mongoose.connect(mongoose_URI)
    .then(()=>{
        console.log("MongoDB connected");
    })
    .catch((error)=>{
        console.log("MongoDB connection failed");
        console.error(error);
    });
};