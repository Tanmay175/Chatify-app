import Message from "../models/message.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getallcontacts= async (req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers= await User.find({_id:{$ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getallcontacts")
        res.status(500).json({Message:"Server error"})
    }
}

export const getmessagesbyuserid= async (req,res)=>{
    try {
        const myid= req.user._id;
        const {id: userTochatId} =req.params;

        const messages= await Message.find({
            $or:[
                {senderid:myid, receiverid:userTochatId},
                {senderid:userTochatId, receiverid:myid}

            ],
        });

        res.status(200).json(messages)
    } catch (error) {
        console.log("error in getmessages controller")
        res.status(500).json({error:"internal server error"})
    }
}

export const sendmessages= async (req,res)=>{
    try {
        const {text,image}=req.body;
        const {id: receiverid}= req.params;
        const senderid= req.user._id;

        let imageUrl;
        if(image){
            const uploadRespons= await cloudinary.uploader.upload(image);
            imageUrl=uploadRespons.secure_url;
        }

       const newmessage = new Message({
    senderId: senderid,
    receiverId: receiverid,
    text,
    image: imageUrl,
})

        await newmessage.save()

        //todo: send message in real-time if user is online -socket.io

        res.status(201).json(newmessage)

    } catch (error) {
        console.log("Error in sendmessage controller",error.message)
        res.status(500).json({error:"Internal Server error"})
    }
}

export const getchatpartners= async (req,res)=>{
    try {
        const loggedinuserid= req.user._id

        //find all messages where the loggedin user in either sender or receiver
        const messages =await Message.find({
            $or:[{senderId:loggedinuserid},{receiverId:loggedinuserid}]
        });

        const chatpartnerIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedinuserid.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            )
        ];

        const chatpartners= await User.find({_id: {$in:chatpartnerIds}}).select("-password")

        res.status(200).json(chatpartners)
    } catch (error) {
        console.error("Error in getchatpartners")
        res.status(500).json("Internal server error",error)
    }
}