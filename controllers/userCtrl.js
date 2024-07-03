const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');
const contactModel = require('../models/contactModel');
const cloudinary = require('../config/cloudinary');
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: 'user not found', success: false });
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            return res.status(200).send({ message: "Invalid Email or password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({ message: "Login Success", success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
}


const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};



const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password = undefined;
        if (!user) {
            return res.status(200).send({ messgae: "user not found", success: false })

        }
        else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Auth failed", succes: false })
    }
}
const applyDoctorController = async (req, res) => {
    try {
        const {pic}=req.body
        if (req.body.pic) {
            const uploadRes = await cloudinary.uploader.upload(pic, {
                upload_preset: 'profilePictures'
            })
            if (uploadRes) {
                const newDoctor = await doctorModel({
                    ...req.body,
                    status: 'pending',
                    pic: uploadRes
                })
                await newDoctor.save();
                const adminUser = await userModel.findOne({ isAdmin: true });
                const notification = adminUser.notification;
                notification.push({
                    type: 'apply-doctor-request',
                    message: `${newDoctor.firstName}  ${newDoctor.lastName} has applied for a doctor account`,
                    data: {
                        doctorId: newDoctor._id,
                        name: newDoctor.firstName + " " + newDoctor.lastName,
                        onClickPath: '/admin/doctors',
                    },
                });
                await userModel.findByIdAndUpdate(adminUser._id, { notification });
            }
        }

        res.status(201).send({
            success: true,
            message: 'Doctor Account Applied Successfully'
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Cant apply doctor', succes: false })
    }
}
const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        const seennotification = user.seenNotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = [];
        user.seenNotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({
            success: true,
            message: "all notification marked as read",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in notification",
            success: false,
            error,
        });
    }
};
const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.notification = [];
        user.seenNotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send(
            {
                success: true,
                message: "notification deleted successfully",
                data: updatedUser

            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'unable to delete all notification'
        })
    }
}
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({ status: 'approved' });
        res.status(200).send({
            data: doctors,
            message: "succes while fetching doctors",
            success: true
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "failed fetchig doctors"
        })

    }
}
const bookAppointmentController = async (req, res) => {
    try {
        req.body.status = "pending";
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
        user.notification.push({
            type: 'new-appointment-request',
            message: `a new appointment request from ${req.body.userInfo.name}`,
            onClickPath: "/user/appointments"
        })
        await user.save();
        res.status(200).send({
            success: true,
            message: "successfully booked"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "failed booking",
            succes: false
        })
    }
}
const bookingAvailabilityController = async (req, res) => {
    try {
        const date = req.body.date;
        const timing = req.body.time.slice(0, 2);
        const substractedTime = timing - 1;
        const addedTime = timing - (-1);
        if (substractedTime >= 0 && substractedTime < 10) {
            var fromTime = "0" + substractedTime + ":" + req.body.time.slice(3, 5);
        }
        else {
            var fromTime = substractedTime + ":" + req.body.time.slice(3, 5);

        }
        if (addedTime >= 0 && addedTime < 10) {
            var toTime = "0" + addedTime + ":" + req.body.time.slice(3, 5);
        } else {
            var toTime = addedTime + ":" + req.body.time.slice(3, 5);
        }

        const doctorId = req.body.doctorId;
        //find doctors timings
        const appointments = await appointmentModel.find({
            doctorId,
            date,
            time: {
                $gte: fromTime, $lte: toTime
            },

        })
        const doctor=await doctorModel.findOne({_id:doctorId});
     
    
        function compareTimes(time1, time2) {
            const [hours1, minutes1] = time1.split(':').map(Number);
            const [hours2, minutes2] = time2.split(':').map(Number);
          
            if (hours1 === hours2) {
              // If hours are equal, compare minutes
              return minutes1 - minutes2;
            }
            
            // If hours are not equal, compare hours
            return hours1 - hours2;
          }
        if (appointments.length > 0 || compareTimes(doctor.timings[0],req.body.time)>0 || compareTimes(req.body.time,doctor.timings[1])>0) {
            console.log(date, fromTime, toTime);
            return res.status(200).send({
                success: false,
                message: "appointments not available at this time"
            })
        } else {
            console.log(date, fromTime, toTime);
            return res.status(200).send({
                success: true,
                message: "appointments  available at this time"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "error in  booking",
            succes: false
        })
    }
}
const userAppointmentController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: "succesfully fetched appointments",
            data: appointments
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "error in  fetching appointment",
            succes: false
        })
    }
}
const updateUserController = async (req, res) => {
    try {
        const user = await userModel.findOneAndUpdate({
            userId: req.body.userId
        }, req.body
        );
        res.status(200).send({
            success: true,
            message: "succesfully updated",
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'User Profile update issue'

        })
    }

}
const getUserByIdController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        res.status(200).send({
            message: 'succesfully fetched',
            success: true,
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'cant fetch doctor by id',
            success: false,
            error
        })
    }
}
const getUserInfoController = async (req, res) => {
    try {
        const user = await userModel.findOne({ userId: req.body.userId });
        res.status(200).send({
            message: 'succesfully fetched',
            success: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'failed fetching user info',
            succcess: false
        })
    }
}
const contactUsController = async (req, res) => {

    try {

        const newContactUs = await contactModel(req.body);
        await newContactUs.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
            type: 'contact-us-message',
            message: `${newContactUs.firstName}  ${newContactUs.lastName} has contacted you`,
            data: {
                name: newContactUs.firstName + " " + newContactUs.lastName,
                onClickPath: '/admin/homepage',
            },
        });
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({
            success: true,
            message: 'Contact us message fetch successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Cant fetch message', succes: false })
    }

}
const userComplaintsController = async (req, res) => {
    try {
        const complaints = await contactModel.find({})
        res.status(200).send({
            success: true,
            message: "succesfully fetched complaints",
            data: complaints
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "error in  fetching complaints",
            succes: false
        })
    }

}
module.exports = { getUserByIdController, userComplaintsController, contactUsController, getUserInfoController, userAppointmentController, bookingAvailabilityController, bookAppointmentController, updateUserController, getAllDoctorsController, loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController };