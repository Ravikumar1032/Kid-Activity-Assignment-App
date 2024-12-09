const Activity = require('../models/Activity');
const User = require('../models/User');

exports.createActivity = async (req, res) => {
  const { name, description, points } = req.body;

  try {
    const activity = new Activity({ name, description, points });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignActivityToKid = async (req, res) => {
  const { userId, kidId, activityId } = req.body;

  try {
    const user = await User.findById(userId);
    const activity = await Activity.findById(activityId);

    if (!user || !activity) {
      return res.status(400).json({ msg: 'User or Activity not found' });
    }

    user.kids.id(kidId).activities.push(activity._id);
    await user.save();
    res.status(200).json({ msg: 'Activity assigned successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateKidPoints = async (req, res) => {
  const { userId, kidId, points } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const kid = user.kids.id(kidId);
    if (!kid) {
      return res.status(400).json({ msg: 'Kid not found' });
    }

    kid.points += points;
    await user.save();
    res.status(200).json({ msg: 'Points updated', kid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
