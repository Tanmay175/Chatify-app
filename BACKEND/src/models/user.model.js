import mongoose from 'mongoose'

const userschema= new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },
},{timestamps:true})

const usermodel= mongoose.model("chats_user",userschema)

export default usermodel;

