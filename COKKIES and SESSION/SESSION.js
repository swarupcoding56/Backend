import express from 'express';
import session from 'express-session';
const app = express();
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using https
}))
app.get('/',(req,res)=>{
    req.session.user={
        name:'swarup',
        age:24,
        email:'swarupmtra54@getMaxListeners.com'
    }
    res.send("Session set!");
})
app.get('/login',(req,res)=>{
    if(req.session.user && req.session.user.name==='swarup'){
        res.send(req.session.user);
        
    } else {
        res.send("Please log in.");
    }
})
app.listen(4000,()=>{
    console.log("Server is running on http://localhost:4000");
});