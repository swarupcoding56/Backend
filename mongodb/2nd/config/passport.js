import {Strategy} from "passport-local"
import bcrypt from "bcryptjs"
import Student from "../models/student.model.js"
function initpassport(passport){
passport.use(new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await Student.findOne({ email });
        if (!user) return done(null, false, { message: "User not valid" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: "Password not valid" });

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser( async (id,done)=>{
    try{
        const user=await Student.findById(id)
        done(null,user);
    }
    catch(err){
        return done(err)
    }
})
}
export default initpassport;