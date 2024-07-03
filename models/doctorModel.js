const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, 'first name is require']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required']
    },
    phone: {
        type: String,
        required: [true, 'phone no is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    specialization:
    {
        type: String,
        required: [true, 'specialization is required']
    },
    experience: {
        type: Number,
        required: [true, 'experience is required']
    },
    feesPerConsultation: {
        type: Number,
        required: [true, 'fees is required']
    },
    status: {
        type: String,
        default: "pending"
    },
    timings: {
        type: Object,

    },
    pic: {
        type: Object,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            
    },

}, { timestamps: true }
);
const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel;