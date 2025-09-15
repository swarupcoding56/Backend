export const login=async(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({message:'Username and password are required'});
    }
    req.session.user={username,password};
    res.cookie('username',username,{httpOnly:true});
    res.cookie('password',password,{httpOnly:true});
    res.json({message:'Login successful'});
}

export const logout=async(req,res)=>{
    
    req.session.destroy(err => {
        if(err){
            return res.status(500).json({message:'Logout failed'});
        }
        res.clearCookie('username');
        res.clearCookie('password');
        res.json({message:'Logout successful'});
    });
}
