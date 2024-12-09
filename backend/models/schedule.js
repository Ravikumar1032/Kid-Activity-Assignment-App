const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    schedule_id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    kid_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User.kids', required: true },
    activities: [
        {
            activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
            day: { type: String, required: true },
            time: { type: String, required: true },
            status: { type: String, enum: ['done', 'not done'], default: 'not done' },
            points: { type: Number, default: 0 },
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
