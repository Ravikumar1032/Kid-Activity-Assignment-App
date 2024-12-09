const express = require('express');
const { createActivity, assignActivityToKid, updateKidPoints } = require('../controllers/activityController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Protect routes with authMiddleware
router.post('/create', authMiddleware, createActivity);
router.post('/assign', authMiddleware, assignActivityToKid);
router.post('/updatePoints', authMiddleware, updateKidPoints);

module.exports = router;
