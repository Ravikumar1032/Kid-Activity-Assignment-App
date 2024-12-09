const mongoose = require('mongoose');
const User = require('./models/user');
const Schedule = require('./models/schedule');
const Activity = require('./models/activity');

// Aggregating Dashboard Data
const getDashboardData = async (userId) => {
    try {
        // Step 1: Find the user and their kids
        const user = await User.findOne({ userid: userId }).lean();

        if (!user) {
            throw new Error('User not found');
        }

        // Step 2: Aggregate schedules and activities for the user's kids
        const kidIds = user.kids.map(kid => kid.kid_id);

        const schedules = await Schedule.aggregate([
            {
                $match: { kid_id: { $in: kidIds } } // Match schedules for the user's kids
            },
            {
                $unwind: '$activities' // Decompose the activities array
            },
            {
                $lookup: { // Join with the Activity collection
                    from: 'activities', // MongoDB collection name for activities
                    localField: 'activities.activity_id',
                    foreignField: 'activity_id',
                    as: 'activityDetails'
                }
            },
            {
                $unwind: '$activityDetails' // Decompose the joined activity details array
            },
            {
                $group: { // Group by kid and day to calculate points and status
                    _id: { kid_id: '$kid_id', day: '$activities.day' },
                    completed: {
                        $sum: { $cond: [{ $eq: ['$activities.status', 'done'] }, 1, 0] }
                    },
                    pending: {
                        $sum: { $cond: [{ $eq: ['$activities.status', 'not done'] }, 1, 0] }
                    },
                    totalPoints: { $sum: '$activities.points' }
                }
            }
        ]);

        // Step 3: Structure the data for the dashboard
        const dashboard = user.kids.map(kid => {
            const kidSchedules = schedules.filter(schedule => String(schedule._id.kid_id) === String(kid.kid_id));
            const weeklySummary = kidSchedules.map(schedule => ({
                day: schedule._id.day,
                completed: schedule.completed,
                pending: schedule.pending,
                totalPoints: schedule.totalPoints
            }));

            return {
                kid_id: kid.kid_id,
                name: kid.name,
                avatar: kid.avatar,
                total_points: kid.total_points,
                weeklySummary
            };
        });

        return dashboard;
    } catch (error) {
        console.error('Error aggregating dashboard data:', error);
        throw error;
    }
};
