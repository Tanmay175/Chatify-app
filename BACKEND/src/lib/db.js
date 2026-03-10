import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectdb= async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI)
        console.log("DB is connected")
    }
    catch(error){
        console.log("DB connecting error:",error)
        process.exit(1) // 1 status code is for failed
    }
}