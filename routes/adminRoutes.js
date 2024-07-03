const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middlewares/authMiddleware");
const { getAllAppointments,postNumberAppointmnets,changeAccountStatusController, getAllDoctorsController, getAllUsersController } = require('../controllers/adminCtrl');
//GTE ALL USERS METHOD
router.get('/getAllUsers', authMiddleWare, getAllUsersController);
//GET ALL DOCTORS METHOD
router.get('/getAllDoctors', authMiddleWare, getAllDoctorsController);
//POST ACCOUNT STATUS
router.post('/changeAccountStatus', authMiddleWare, changeAccountStatusController);
router.get('/postNumberAppointmnets',authMiddleWare, postNumberAppointmnets)
router.get('/getAllAppointments',authMiddleWare,getAllAppointments);
module.exports = router;