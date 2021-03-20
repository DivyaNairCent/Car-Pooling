let mongoose = require('mongoose');

// creating a model class
let userModel = mongoose.Schema({
    username: String,
    name: String,
    emailId: String,
    password: String,
    isEmailVerified: Boolean,
    isActive: Boolean
}, {
    collection: 'user',
    timestamps: true
});

module.exports = mongoose.model('user', userModel);