// const mongoose = require('mongoose');

// const activitySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   points: { type: Number, required: true },
// });

// module.exports = mongoose.model('Activity', activitySchema);

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activity_id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    created_by: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
