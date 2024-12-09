const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


//Login with Google
exports.loginWithGoogle = async (req, res) => {
  const { name, email, avatar } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, avatar });
      await user.save();
    }

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Add Kids to the DataBase
exports.handleAddKid = async (req, res) => {
  try {
    const { email, kidName, } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const kidId = new mongoose.Types.ObjectId();
    user.kids.push({
      kid_id: kidId,
      name: kidName,
      total_points: 0,
    });

    console.log(user.kid);

    await user.save();
    res.status(201).json({ message: 'Kid added successfully', kidId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}


//Add Activity of the kids to the DataBase
exports.handleAddActivity = async (req, res) => {
  try {

    let points = 0;
    const { email, kidId, activityName, schedule } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });


    // Find the kid by ID
    const kid = user.kids.id(kidId);
    // const kid = user.kids.find((k) => k.kid_id.toString() === kidId.toString());
    console.log(kid);
    if (!kid) return res.status(404).json({ message: 'Kid not found' });

    console.log(kid);
    // Create and add the activity
    const activityId = new mongoose.Types.ObjectId();
    kid.activities.push({
        activity_id: activityId, // Auto-generated activity ID
        name: activityName,      // Name of the activity
        kid_id: kid.kid_id,      // Reference to the kid's ID
        points: points || 0,     // Default points if not provided
        schedule,                // Array of schedule objects
    });
    
    console.log('success');
    await user.save();
    res.status(201).json({ message: 'Activity added successfully', activityId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

exports.handleGetKidActivity = async (req, res) => {
  try {
    const { email, kidId } = req.query;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find the kid by ID
    const kid = user.kids.id(kidId);
    if (!kid) return res.status(404).json({ message: 'Kid not found' });

    res.status(200).json({ activities: kid.activities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updateActivityPoints = async (req, res) => {
  const { email, kidId, activityId, points } = req.body;

  if (!email || !kidId || !activityId || points === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const kid = user.kids.find((kid) => kid.kid_id.toString() === kidId);
      if (!kid) {
          return res.status(404).json({ message: 'Kid not found' });
      }

      const activity = kid.activities.find((activity) => activity.activity_id.toString() === activityId);
      if (!activity) {
          return res.status(404).json({ message: 'Activity not found' });
      }

      // Update the points of the activity
      activity.points = points;

      // Recalculate total points for the kid
      kid.total_points = kid.activities.reduce((sum, activity) => sum + activity.points, 0);

      await user.save();

      res.json({
          message: 'Activity points updated successfully',
          kid: kid,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating activity points' });
  }
}


//Delete User
exports.handleDeleteKids = async (req, res) => {
  const { email, kidId } = req.body;

  if (!email || !kidId) {
      return res.status(400).json({ message: 'Email and Kid ID are required' });
  }

  try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Remove the kid from the user's kids array
      const updatedKids = user.kids.filter((kid) => kid.kid_id.toString() !== kidId);
      if (updatedKids.length === user.kids.length) {
          return res.status(404).json({ message: 'Kid not found' });
      }

      user.kids = updatedKids;
      await user.save();

      res.status(200).json({ message: 'Kid deleted successfully', kids: user.kids });
  } catch (error) {
      console.error('Error deleting kid:', error);
      res.status(500).json({ message: 'An error occurred while deleting the kid' });
  }
}

exports.handleDeleteActivity = async (req, res) => {
  const { email, kidId, activityId } = req.body;

  if (!email || !kidId || !activityId) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const kid = user.kids.find((kid) => kid.kid_id.toString() === kidId);
      if (!kid) {
          return res.status(404).json({ message: 'Kid not found' });
      }

      const activityIndex = kid.activities.findIndex((activity) => activity.activity_id.toString() === activityId);
      if (activityIndex === -1) {
          return res.status(404).json({ message: 'Activity not found' });
      }

      // Remove the activity from the kid's activities
      kid.activities.splice(activityIndex, 1);

      // Recalculate total points for the kid
      kid.total_points = kid.activities.reduce((sum, activity) => sum + activity.points, 0);

      await user.save();

      res.json({
          message: 'Activity deleted successfully',
          kid: kid,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting activity' });
  }
}


exports.handleGetPast7DaysActivities =  async (req, res) => {
  const { email, kidId } = req.query;

  if (!email || !kidId) {
      return res.status(400).json({ message: 'Email and Kid ID are required' });
  }

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const kid = user.kids.find((kid) => kid.kid_id.toString() === kidId);
      if (!kid) {
          return res.status(404).json({ message: 'Kid not found' });
      }

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Filter activities based on the past 7 days
      const recentActivities = kid.activities.filter((activity) =>
          activity.schedule.some((slot) => {
              const activityDate = new Date(slot.day);
              return activityDate >= sevenDaysAgo;
          })
      );

      res.json({ activities: recentActivities });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching activities' });
  }
}




exports.getKidSummary = async (req, res) => {
  try {
      const { email, kidId } = req.query;

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      const kid = user.kids.id(kidId);
      if (!kid) return res.status(404).json({ message: 'Kid not found' });

      const totalPoints = kid.total_points;
      const activities = kid.activities.map(activity => ({
          name: activity.name,
          points: activity.points,
          schedule: activity.schedule,
      }));

      res.status(200).json({ totalPoints, activities });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.handleGetAllKids = async (req, res) => {
  try {
      const email = req.headers.email; // Get user email from headers or authentication middleware
      const user = await User.findOne({ email: email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      res.status(200).json({ kids: user.kids });
  } catch (error) {
      console.error('Error fetching kids:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

exports.handleUpdateActivity = async (req, res) => {
  const { email, kidId, activityId, points } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const kid = user.kids.id(kidId);
      if (!kid) {
          return res.status(404).json({ message: 'Kid not found' });
      }

      const activity = kid.activities.id(activityId);
      if (!activity) {
          return res.status(404).json({ message: 'Activity not found' });
      }

      // Update the points
      activity.points = points;
      await user.save();

      res.json({ message: 'Activity points updated successfully', activity });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
}