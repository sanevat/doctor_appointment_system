const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
       firstName: {
              type: String,
              required: [true, 'first name is require']
          },
          lastName: {
              type: String,
              required: [true, 'last name is required']
          },
          phoneNumber: {
              type: String,
              required: [true, 'phone no is required']
          },
          email: {
              type: String,
              required: [true, 'email is required']
          },
    message : {
           type: String,
           required: true
    },
}, { timestamps: true })
const contactModel = mongoose.model('contactUs', contactSchema);
module.exports = contactModel;