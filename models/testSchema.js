var mongoose = require('mongoose');

var testUserSchema = mongoose.Schema({
    name: String,
    password: String,
    admin: Boolean
});

var User = mongoose.model('User', testUserSchema);

module.exports = User;
