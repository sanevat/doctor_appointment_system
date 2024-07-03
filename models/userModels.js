const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    surname: {
        type: String,

    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isAdmin:
    {
        type: Boolean,
        default: false
    },
    isDoctor:
    {
        type: Boolean,
        default: false
    },
    notification:
    {
        type: Array,
        default: []
    },
    seenNotification:
    {
        type: Array,
        defualt: []
    },
    pic: {
        type: Object,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            
    },


});
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;