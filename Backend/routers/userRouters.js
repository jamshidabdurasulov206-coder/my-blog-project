const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/usercontrollers');
const { loginUser } = require('../controllers/usercontrollers');
const authMiddleware=require('../middleware/auth');

router.post('/login', loginUser);
router.post('/register', registerUser);


router.get('/protect', authMiddleware, (req, res)=>{
    res.json({message: 'siz authorized foydalanuvchisiz ',user: req.user});
});

module.exports = router;
