import express from 'express';
import { signupUser } from '../controller/user-controller.js';
import user from '../model/user.js';

const router = express.Router();

router.post('/signup', signupUser);
// router.post('/login', loginUser);
// router.post('/logout', logoutUser);

export default router;