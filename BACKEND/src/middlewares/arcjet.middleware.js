import aj from '../lib/arcjet.js'
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetprotection= async (req,resizeBy,next)=>{
    try {
        const decesion= await aj.protect(req)

        if(decesion.isDenied()){
            if(decesion.reason.isRateLimit()){
                return res.status(429).json({message:"Rate limit exceed "})
            }
            else if(decesion.reason.isBot){
            return res.status(403).json({message:"bot access denied"})
            }else{
            return res.status(403).json({message:"Access denied by security policy"})
            }
        }
        
        //check for spoofed bots
        if (decesion.results.some(isSpoofedBot)){
            return res.status(403).json({
                error:"spoofed bot detected",
                message:"Malicious bot activity detected"
            });
        }

        next()

    } catch (error) {
        console.log("arcjet protection error: ", error )
        next();
    }
}