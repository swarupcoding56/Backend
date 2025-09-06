import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = 3000;
app.use(cookieParser("secretkey"));
app.get('/',(req,res)=>{
    res.cookie('name', 'swarup',{
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    });
    res.send("Cookie set!");
})
app.get("/login",(req,res)=>{
    if(req.cookies.name && req.cookies.name==='swarup'){
        res.send(req.cookies);
        
    } else {
        res.send("Please log in.");
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});