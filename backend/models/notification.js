const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notification_id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    user_id: { type: String, required: true },
    kid_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User.kids' },
    message: { type: String, required: true },
    status: { type: String, enum: ['unread', 'read'], default: 'unread' },
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
