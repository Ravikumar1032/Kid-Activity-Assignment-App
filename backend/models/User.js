const mongoose = require('mongoose');

// Activity Schema
const activitySchema = new mongoose.Schema({
    activity_id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    kid_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the specific kid
    points: { type: Number, default: 0 }, // Points for the activity
    schedule: [
        {
            day: { type: String, required: true }, // e.g., "Monday"
            time_slot: { type: String, required: true }, // e.g., "10:00 AM - 11:00 AM"
        },
    ],
}, { timestamps: true });

// Embed Activities in the User Schema
const kidSchema = new mongoose.Schema({
    kid_id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    total_points: { type: Number, default: 0 },
    activities: [activitySchema], // Embed activities for each kid
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    profile: { type: String },
    kids: [kidSchema],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
