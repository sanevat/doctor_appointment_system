const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');
const userModel = require('../models/userModels');
const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        res.status(200).send({
            message: 'succesfully fetched',
            success: true,
            data: doctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'failed fetching doctor info',
            succcess: false
        })
    }
}
const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({
            userId: req.body.userId
        }, req.body
        );
        res.status(200).send({
            success: true,
            message: "succesfully updated",
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Doctor Profile update issue'

        })
    }
}
const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId })
        res.status(200).send({
            message: 'succesfully fetched',
            success: true,
            data: doctor
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
const doctorAppointmentController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        const appointment = await appointmentModel.find({ doctorId: doctor._id })
        res.status(200).send({
            success: true,
            message: "Dpctor appointments fetch Successfully",
            data: appointment
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'cant fetch appointment',
            succes: false,
            error
        })
    }
}
const updateStatusContoller = async (req, res) => {
    try {
        const { appointmentsId, status } = req.body;
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, { status });
        const user = await userModel.findOne({ _id: appointments.userId });
        const notification = user.notification;
        notification.push({
            type: 'status-updated',
            message: `your appointment has been updated ${status}`,
            onClickPath: "/doctor-appointments"
        })
        await user.save();
        res.status(200).send({
            succcess: true,
            message: 'Appointment status updated'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'failed updatiing status',
            error,
            success: false
        })
    }
}

module.exports = { updateStatusContoller, doctorAppointmentController, getDoctorInfoController, updateProfileController, getDoctorByIdController }