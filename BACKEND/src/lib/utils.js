import jwt from 'jsonwebtoken'

export const generateToken=(userid, res)=>{
    const token= jwt.sign({
        userid
    },process.env.JWT_SECRET,{expiresIn:"10d",});
   
    res.cookie("jwt",token,{
        maxAge:10*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:false
    });

}