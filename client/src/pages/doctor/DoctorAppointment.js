import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import moment from 'moment';
import '../../styles/Appointments.css';
import { Table, message } from 'antd';
import { Chart } from "react-google-charts";
import doctorImg from '../../img/doc1.jpg';
import like from '../../img/like.png';
import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import 'react-big-calendar/lib/css/react-big-calendar.css'
const DoctorAppointment = () => {
    const { user } = useSelector(state => state.user);
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState();
    const params = useParams();
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
    useEffect(() => {
        getUserData()
    }, []);
    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/doctor/doctor-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getAppointments();
    }, [])
    var allAppointments = 0, countTodays = 0, countCompleted = 0, countRejected = 0, countApproved = 0;
    appointments.map(app => {
        allAppointments++
    })
    const todaysDay = moment().startOf('day');
    appointments.forEach(function (app) {
        if (app.date === todaysDay)
            ++countTodays;
    })
    appointments.forEach(function (app) {
        if (app.status === 'approved')
            ++countApproved;
    })

    for (var i = 0; i < allAppointments; i++) {
        const d1 = todaysDay.valueOf();
        const appointmentDate = moment(appointments[i].date, "DD-MM-YYYY");
        
        if (appointmentDate.isBefore(todaysDay, 'day') && appointments[i].status === 'approved') {
            ++countCompleted;
        }
    }
    appointments.forEach(function (app) {
        if (app.status === "rejected")
            ++countRejected;
    })
    const handleStatus = async (record, status) => {
        window.location.reload();
        try {
            const res = await axios.post('/api/v1/doctor/update-status', {
                appointmentsId: record._id, status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                message.success(res.data.message);
                getAppointments();

            }

        } catch (error) {
            console.log(error);
            message.error('something went wrong');

        }
    }
    const columns = [
        {
            title: 'Picture',
            dataIndex: 'pic',
            render: (text, record) => {
                return (

                    <img style={{ height: 50 }} className='profilePic' src={record.userInfo.pic} />

                )
            }
        },
        {
            title: 'Patient`s name',
            dataIndex: 'userInfo.name',
            key: 'name',
            render: (text, record) => {
                return (
                    <div>
                        {record.userInfo.name} {record.userInfo.surname}
                    </div>
                )
            }

        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text, record) => {
                return (
                    <div>
                        {record.userInfo.email}
                    </div>
                )
            }

        },
        {
            title: 'Date',
            dataIndex: 'date',

        },
        {
            title: "Time",
            dataIndex: 'time'
        },
        {
            title: 'Status',
            dataIndex: 'status',

        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
                return (
                    <div>
                        {record.status === 'pending' && (
                            <div>
                                <button className='btn btn-success' onClick={() => handleStatus(record, 'approved')}>Approve</button>
                                <button className='btn btn-danger' onClick={() => handleStatus(record, 'rejected')}>Reject</button>
                            </div>
                        )}
                    </div>
                )
            }
        }


    ]
    const completedPercentage = parseFloat(countCompleted * 100 / (allAppointments - countRejected)).toFixed(2);

    const options = {
        title: "Completed and upcoming events diagram",
        pieHole: 0.4,
        is3D: false,
        slices: {
            0: { color: '#17a4c7' },
            1: { color: 'grey' },
        },


    };
    const data = [
        ["Task", "allAppointments"],
        ["Completed", countCompleted],
        ["Upcoming", countApproved - countCompleted],

    ];
   
        
    
    return (
        <Layout>
            <div className='chartHeader'>
                <div className='doctorContainerAfternoon'>
                    <div className='afternoon '>


                        <img className="doctorImgApp" src={doctorImg}></img>
                        <h3>Good afternoon dr.{user?.name}</h3>
                        
                    </div>

                </div>
               
                      
                <div className='chartContainer' >
                    <Chart className='chartContainer'
                        chartType="PieChart"
                        width="350px"
                        height="200px"

                        data={data}
                        options={options}
                    />
                </div>
            </div>
            
               
                    
          
            <div className='analyzer'>
                <div className='cardAnalysis'>
                    <div className='number1'>
                        {allAppointments}
                    </div>
                    <p className='allPatients'><b>All patients </b></p>
                </div>
                <div className='cardAnalysis'>
                    <div className='number2'>
                        {countTodays}
                    </div>
                    <p className='todays'><b>Today`s  </b></p>
                </div>
                <div className='cardAnalysis'>
                    <div className='number3'>
                        {countApproved}
                    </div>
                    <p className='approved'><b>Approved </b></p>
                </div>
                <div className='cardAnalysis'>
                    <div className='number4'>
                        {countRejected}
                    </div>
                    <p className='rejected'><b>Rejected </b></p>
                </div>
                <div className='cardAnalysis'>
                    <div className='number5'>
                        {countCompleted}
                    </div>
                    <p className='completed'><b>Completed </b></p>

                </div>



            </div>
            {/*
            <p>Completed {completedPercentage}%</p>
            <p>Upcoming {parseFloat(100 - completedPercentage).toFixed(2)}%</p>
*/}

            <div className='appList'>

                <p><b>Appointments list</b></p>
            </div>
            <Table rowClassName={() => "rowClassName1"} className='tableAppointments' columns={columns} dataSource={appointments} />
        
        </Layout>
    )
};
export default DoctorAppointment;