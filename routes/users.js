const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const { RegisterUser, LoginUser, getUserDetails, LogoutUser } = require('../controller/AuthController');

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.get('/auth', auth, getUserDetails);
router.get('/logout', auth, LogoutUser);
router.get('/', (req, res) => res.send('hello users'));

module.exports = router;
