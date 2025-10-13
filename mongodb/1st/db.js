import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        const connect=await mongoose.connect("mongodb://localhost:27017/mydatabase");
        console.log(`MongoDB connected: ${(connect.connection.host)}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}
export default connectDB;