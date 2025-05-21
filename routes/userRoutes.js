import express from 'express';
import { getMe, updateMe } from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/me', verifyToken, getMe);
router.put('/me', verifyToken, upload.single('profilePic'), updateMe);

export default router;
