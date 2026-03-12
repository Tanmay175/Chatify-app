import express from 'express'
import {signup, login, logout, checkAuth } from '../controllers/auth.controller.js';
const router=express.Router();
import { protectroute } from '../middlewares/auth.middleware.js';
import { updateprofile } from '../controllers/auth.controller.js';
import { arcjetprotection } from '../middlewares/arcjet.middleware.js';

router.use(arcjetprotection); // at first it will be run and chk and then rest will run 

router.post("/signup",signup)
router.post("/login",arcjetprotection,login)
router.post("/logout",logout)

router.put("/update-profile",protectroute,updateprofile)
// router.get("/check",protectroute,(req,res)=>{res.status(200).json(req.user)})
router.get("/check", protectroute, checkAuth);

export default router