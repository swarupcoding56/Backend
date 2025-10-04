export function checkauth(req,res,next){
if(req.isAuthenticated()){
    return next();
}
res.redirect("/api/students/login")
}
export function checkguest(req,res,next){
if(req.isAuthenticated()){
    res.redirect("/api/students/dashboard")
}
return next();
}