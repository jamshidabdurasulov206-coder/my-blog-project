const express=require('express');
const router=express.Router();

const {createpost, getposts, getpostById, updatepost, deletePost}=require('../controllers/postcontroller')

const authMiddleware = require('../middleware/auth');

router.post('/posts', authMiddleware, createpost);
router.get('/posts', getposts);
router.get('/posts/:id', getpostById);
router.put('/posts/:id', authMiddleware, updatepost);
router.delete('/posts/:id', authMiddleware, deletePost);

module.exports = router;