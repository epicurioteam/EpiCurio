import express from 'express';

import { updatePost, createPost, getPosts, deletePost, likePost } from '../controllers/posts.js';
const router = express.Router();

// callback function executed when a user sends a request to this route/endpoint 
router.get('/', getPosts);

// create

router.post('/', createPost);

// needs to know id to update post
router.patch('/:id', updatePost);

// delete
router.delete('/:id', deletePost);

// like
router.patch('/:id/likePost', likePost);

export default router;