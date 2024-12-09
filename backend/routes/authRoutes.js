const express = require('express');
const { googleLogin,googleUsers } = require('../controllers/authController');

const router = express.Router();

// Route for Google Login
router.post('/google', googleLogin);
router.get('/google/users',googleUsers);

module.exports = router;
