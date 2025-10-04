import { Schema as schema, model } from 'mongoose';

const studentSchema = new schema({
  name: { type: String, required: true },
  password:{type:String,required:true},
  email: { type: String, required: true },
});

const Student = model('Student', studentSchema);

export default Student;
