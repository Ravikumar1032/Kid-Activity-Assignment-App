const express = require('express');
const { loginWithGoogle,handleAddKid,handleAddActivity, handleGetKidActivity,updateActivityPoints,getKidSummary, handleGetAllKids,handleUpdateActivity,handleDeleteActivity,handleGetPast7DaysActivities,handleDeleteKids } = require('../controllers/userController');
const router = express.Router();

router.post('/login/google', loginWithGoogle);
router.post('/add-kid',handleAddKid);
router.post('/add-activity', handleAddActivity);
// router.post('/kid-activity/:id',handleGetKidActivity);
router.put('/update-activity-points',updateActivityPoints);
router.get('/getKidSummary',getKidSummary);
router.get('/kids',handleGetAllKids);
router.post('/complete-activity',handleUpdateActivity);
router.delete('/delete-activity',handleDeleteActivity);
router.get('/activities-past-7-days',handleGetPast7DaysActivities);
router.delete('/delete-kid',handleDeleteKids);
module.exports = router;
