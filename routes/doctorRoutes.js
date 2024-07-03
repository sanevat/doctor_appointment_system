const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { updateStatusContoller,doctorAppointmentController,updateProfileController, getDoctorInfoController, getDoctorByIdController } = require('../controllers/doctorCtrl');
const router = express.Router();

router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);
router.post('/updateProfile', authMiddleware, updateProfileController)

// get single doctor info
router.post('/getDoctorById', authMiddleware, getDoctorByIdController);
router.get('/doctor-appointments', authMiddleware, doctorAppointmentController)
//post update-status
router.post('/update-status',authMiddleware,updateStatusContoller)
module.exports = router;