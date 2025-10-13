import { create } from 'domain';
import {Schema,model} from 'mongoose';
const userSchema=new Schema({
    name:{type:String,required:true,maxLength:50},
    email:{type:String,required:true,unique:true},
    age:{type:Number,required:true,min:0},
    createdAt:{type:Date,default:Date.now}
});
const userModel=model("User",userSchema);
export default userModel;