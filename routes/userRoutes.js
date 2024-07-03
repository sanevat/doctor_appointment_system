const express = require('express');
const {getUserByIdController,userComplaintsController,contactUsController,getUserInfoController,updateUserController, userAppointmentController, bookingAvailabilityController, getAllDoctorsController, bookAppointmentController, loginController, deleteAllNotificationController, getAllNotificationController, registerController, authController, applyDoctorController } = require('../controllers/userCtrl');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
//routes

//Login||POST
router.post('/login', loginController);
//Register || POST
router.post('/register', registerController);
//auth||POST
router.post('/getUserData', authMiddleware, authController)
//Apply Doctor||POST
router.post("/apply-doctor", authMiddleware, applyDoctorController)
//Notification Doctor||POST
router.post("/get-all-notification", authMiddleware, getAllNotificationController);
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
//Book appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController);
//Boooking availability
router.post('/book-availability', authMiddleware, bookingAvailabilityController)
router.post('/updateProfile',authMiddleware,updateUserController)
router.get('/user-appointments', authMiddleware, userAppointmentController);
router.post('/getUserInfo',authMiddleware,getUserInfoController);
router.post('/contactUs',authMiddleware,contactUsController);
router.get('/contactUsComplaints',authMiddleware,userComplaintsController);
router.post('/getUserById',authMiddleware,getUserByIdController);
module.exports = router;