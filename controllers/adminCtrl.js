const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({
            success: true,
            message: 'users data list',
            data: users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'eror while fetching users'
        })
    }
}
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            message: 'doctors data list',
            success: true,
            data: doctors
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while fetching doctors'
        })
    }
}
const changeAccountStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {
            status
        });
        const user = await userModel.findOne({ _id: doctor.userId });
        const notification = user.notification;
        notification.push({
            type: 'doctor-account-reques-updated',
            message: `Your doctor Account request has  ${status}`,
            onClickPath: '/notification'
        })
        user.isDoctor=status === 'approved' ? true : false;
        await user.save();
        res.status(201).send({
            success: true,
            message: 'Acount status updated',
            data: doctor
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while changing status'
        })
    }
}
const postNumberAppointmnets=async(req,res)=>{
    try{
        const counter=await appointmentModel.countDocuments();
        console.log(counter);
        res.status(200).send({
            data: counter,
            message: "succes while fetching counter",
            success: true
        })
    }
    catch(error)
    {
        console.log(counter);
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while counting  number of appointments'
        })
    }
}
const getAllAppointments=async(req,res)=>{
    try {
        const appointments = await appointmentModel.find({});
        res.status(200).send({
            message: 'doctors data list',
            success: true,
            data: appointments
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while fetching doctors'
        })
    }
}
module.exports = {getAllAppointments,postNumberAppointmnets, changeAccountStatusController, getAllDoctorsController, getAllUsersController };