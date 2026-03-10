import jwt from 'jsonwebtoken'
import usermodel from '../models/user.model.js'
import {ENV} from '../lib/env.js'


export const protectroute= async(req,res,next)=>{
    try {
        const token=req.cookies.jwt
        if(!token) return res.status(401).json({message:"NO token provided"})
         
        const decoded= jwt.verify(token,ENV.JWT_SECRET)
         if(!decoded) return res.status(401).json({message:"Invalid token"})

        const user= await usermodel.findById(decoded.userid).select("-password")
         if(!user) return res.status(401).json({message:"user not found"})

        req.user=user    
        next()    

    } catch (error) {
        console.log("Error in protectRoute",error)
        res.status(500).json({message:"Internal server error"})
    }
}