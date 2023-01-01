//here route is used for api purpose, its not api but route is end point of api
// suppose : "facebook.com/users" so here facebook.com is api url and /users is end point; end point is always change. so according end point we decide which api to be called.
import express from 'express';

import { signupUser,loginUser } from '../controller/user-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { createPost, getAllPosts, getPost, updatePost, deletePost } from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';

import uploads from '../utils/uploads.js';

const router = express.Router();

router.post('/signup',signupUser); //here signup is a endpoint of api and signupUser is api
router.post('/login',loginUser);

router.post('/file/upload',upload.single('file'), uploadImage);
//generally router take 3 arguments 
//here second argument is called as middlewear whose info is wrote in utils/upload.js
router.get('/file/:filename', getImage);

router.post('/create', authenticateToken ,createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comments/delete/:id', authenticateToken, deleteComment);

export default router;

