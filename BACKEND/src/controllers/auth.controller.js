import usermodel from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js"
import { sendwelcomeEmail } from "../emails/emailHandlers.js"
import cloudinary from "../lib/cloudinary.js"

export const signup = async(req,res)=>{
    const {fullname, email, password}=req.body

    try {
        if(!fullname || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        
        if(password.lemgth<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"})         
        }

        //check if mail is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        });
        }

        const user= await usermodel.findOne({email})
        if(user) return res.status(400).json({message:"Email already exist"})
        
        // hashing
        const salt= await bcrypt.genSalt(10)
        const hashpassword= await bcrypt.hash(password,salt)

        const newuser= new usermodel({
            fullname,
            email,
            password:hashpassword
        })

        if(newuser){
            generateToken(newuser._id,res)
            await newuser.save()

            res.status(201).json({
                _id:newuser._id,
                fullname:newuser.fullname,
                email:newuser.email,
                profilePic:newuser.profilePic
            })

            //todo: send welcome email to user

            try {
                sendwelcomeEmail("sahatanmay108@gmail.com", newuser.fullname,"http://localhost:5173")
            } catch (error) {
                console.error("Failed to send welcome email")
            }
        }
        else{
            res.status(400).json({message:"Invalid user data"})
        }


    } catch (error) {
        console.log("error in signup",error)
        res.status(500).json({
            message:"internal server error"
        })
    }



}

export const login =async(req,res)=>{
    const {email, password}=req.body

    try {
        const user= await usermodel.findOne({email})
        if(!user) return res.status(400).json({message:"Invalid credentials"})
        
        const ispasswordcorrect= await bcrypt.compare(password,user.password)
        if(!ispasswordcorrect)  return res.status(400).json({message:"Invalid credentials"}) 
            
        generateToken(user._id,res)
        
        res.status(200).json({
    _id:user.id,
    fullname:user.fullname,
    email:user.email,
    profilePic:user.profilePic
})

    } catch (error) {
        console.error("Error in login controller:",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const logout =async(_,res)=>{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"logged out successfully"})
}

export const updateprofile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const userid = req.user._id;

    const uploadresponse = await cloudinary.uploader.upload(profilePic);

    const updateduser = await usermodel.findByIdAndUpdate(
      userid,
      { profilePic: uploadresponse.secure_url },
      { new: true }
    );

    res.status(200).json({
      _id: updateduser._id,
      fullname: updateduser.fullname,
      email: updateduser.email,
      profilePic: updateduser.profilePic
    });

  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

