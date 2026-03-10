import express from 'express'
const router =express.Router();
import { getallcontacts } from '../controllers/messagecontroller.js';
import { protectroute } from '../middlewares/auth.middleware.js';
import { getmessagesbyuserid } from '../controllers/messagecontroller.js';
import { sendmessages } from '../controllers/messagecontroller.js';
import { getchatpartners } from '../controllers/messagecontroller.js';
import { arcjetprotection } from '../middlewares/arcjet.middleware.js';

//the middleware execu

router.use(arcjetprotection, protectroute)

router.get("/contacts",getallcontacts);
router.get("/chats",getchatpartners);
router.get("/:id",getmessagesbyuserid);
router.post("/send/:id",sendmessages);

export default router