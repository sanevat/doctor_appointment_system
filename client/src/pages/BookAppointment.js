import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { TimePicker, message } from "antd";
import moment from 'moment';
import Calendar from 'react-calendar';
import '../styles/BookAppoitnment.css';
import calendar from '../img/calendar.png';
import telephone from '../img/telephone.png';
import gmail from '../img/email.png';
import location from '../img/placeholder.png';
const BookApointment = () => {
    const { user } = useSelector(state => state.user);
    const [doctors, setDoctors] = useState(null);
    const params = useParams();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
    const todaysDay = moment(new Date()).format("DD-MM-YYYY");
    const [doctorsUser, setDoctorsUser] = useState();
    const getUserData = async () => {
        try {
            const res = await axios.post("/api/v1/doctor/getDoctorById", { doctorId: params.doctorId }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            }
            );
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleBooking = async () => {
        try {
            setIsAvailable(true);
            const res = await axios.post('/api/v1/user/book-appointment',
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctors,
                    userInfo: user,
                    date: date,
                    time: time
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {

                message.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleAvailability = async () => {
        try {

            const res = await axios.post('/api/v1/user/book-availability', {
                doctorId: params.doctorId, date, time
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setIsAvailable(true);
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserData()
    }, []);
    return (
        <Layout>
            <div className="wholePage">
                <div className="DoctorInfoContainer">
                    {doctors && (
                        <div >
                            <div className="doctorsInfo">
                                <img className="doctorImgBooking" src={doctors.pic.url}></img>
                                <p className="doctorsName">Dr. {doctors.firstNamme} <b>{doctors.lastName}</b></p>
                                <p className="doctorsSpeci"><b>{doctors.specialization}</b></p>
                                <p>Timings:  {doctors.timings && doctors.timings[0]} -{" "}
                                    {doctors.timings && doctors.timings[1]}{" "}
                                </p>

                            </div>
                            <hr />
                            <p>dr. {doctors.lastName} has worked in our hospital for {doctors.experience} years now, book appointment now with {doctors.feesPerConsultation}
                                $ fee</p>
                            <hr />
                            <p><img className="icons location" src={location}></img> {doctors.address}</p>

                            <p><img className="icons phone" src={telephone}></img>
                                {doctors.phone}
                            </p>
                            <p><img className="icons mail" src={gmail}></img>      {doctors.email}</p>


                        </div>


                    )}
                </div>
                <div className="titleBook">

                    <div className="titleContainer">
                        <h4 className="bookAppTitle">Book <b>Appointment</b></h4>
                        <div className="todaysDate">
                            <div>
                                <p className="">Today`s date</p>

                                <h6 className="">{`${todaysDay}`}</h6>
                            </div>
                            <div className="iconCalendar">
                                <img id="calendarIcon" src={calendar}></img>
                            </div>

                        </div>
                    </div>

                    <div className="calendarContainer">
                        <Calendar className="react-calendar" format='DD-MM-YYYY' onChange={(value) => {
                            setIsAvailable(false)
                            setDate(moment(new Date(value)).format('DD-MM-YYYY'))
                        }}></Calendar>
                        {/*}
                        <DatePicker inline={true} format='DD-MM-YYYY' onChange={(value) => {
                            setIsAvailable(false)
                            setDate(moment(new Date(value)).format('DD-MM-YYYY'))
                        }
                        } ></DatePicker>
                    */}
                        <div className="timePicker">
                            <p>Please select you preffered time slot</p>
                            <TimePicker classname="pickTime" size="large" format='HH:mm' onChange={(value) => {
                                setIsAvailable(false);
                                setTime(moment(new Date(value)).format('HH:mm'))
                            }} />
                            <br></br>
                            <hr></hr>

                        </div>

                        <div className="yourChoice">
                            <div className="date_time">
                                <h4>Date: {date}</h4>
                                <h4>Time: {time} h</h4>
                            </div>
                            <div className="buttons">



                                <button className=" checkAvailability mt-2" onClick={handleAvailability}>Check Availability</button>
                                <br></br>
                                <button className=" bookNow btn btn-dark mt-2" onClick={handleBooking}>Book now</button>
                            </div>
                        </div>



                    </div>

                </div>

            </div>


        </Layout>
    )
}
export default BookApointment;