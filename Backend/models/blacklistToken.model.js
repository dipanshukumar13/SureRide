const mongoose = require('mongoose');
const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24h', // TTL index for 24 hours
    },
});

const blacklistedTokenModel = mongoose.model('blacklistedTokenModel', blacklistedTokenSchema);

module.exports = blacklistedTokenModel;