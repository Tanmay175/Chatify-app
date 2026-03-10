import express from 'express'
import dotenv from 'dotenv';
import authroutes from './src/routes/auth.route.js'
import messageroutes from './src/routes/message.route.js'
import { connectdb } from './src/lib/db.js';
import cookieParser from 'cookie-parser';
import { ENV } from './src/lib/env.js';

dotenv.config()
const PORT=ENV.PORT

const app=express()
app.use(express.json()) 
app.use(cookieParser())

app.use('/api/auth',authroutes)
app.use('/api/message',messageroutes)


app.get("/", (req,res)=>{
    res.send("Server working");
});

app.listen(PORT, () => {
    connectdb()
   console.log(`Server running on port ${PORT}`);
});

// import express from "express";

// const app = express();

// app.get("/", (req,res)=>{
//     res.send("Server working");
// });

// app.listen(4000, ()=>{
//     console.log("Server running on port 4000");
// });