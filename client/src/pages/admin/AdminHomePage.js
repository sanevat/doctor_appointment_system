import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import moment from 'moment';
import ContactUs from '../../components/ContactUs';
const AdminHomePage = () => {
    const [doctors, setDoctors] = useState([]);


    const getUserData = async () => {
        try {
            const res = await axios.get("/api/v1/user/getAllDoctors", {
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
    const [users, setUsers] = useState([]);
    //getUsers
    const getUsers = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUsers()
    }, []);
    const [numAppointments, setNumAppointments] = useState(null);
    const getNumAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/admin/postNumberAppointmnets', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setNumAppointments(res.data.data);
            }
        } catch (error) {
            console.log(`we have error here ${error}`);
        }

    }
    useEffect(() => {
        getNumAppointments();
    })
    const [appointments, setAppointments] = useState([]);
    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllAppointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(`we have error here ${error}`);
        }

    }
    useEffect(() => {
        getAppointments();
    }, [])
    var countDoctors = 0, countPatients = 0, countTodays = 0;
    doctors.map(doctor => (
        ++countDoctors
    ))
    users.map(user => (
        ++countPatients
    ))
    const todaysDay = moment(new Date()).format("DD-MM-YYYY");
    appointments.forEach(function (app) {
        if (app.date === todaysDay)
            ++countTodays;
    }

    )


    return (
        <Layout>
            <h3 className='m-5 text-center'>Admin`s dashboard</h3>
            <div className='analyzer'>
            <div className='cardAnalysis'>
                <div className='number1'>
                    {countDoctors}
                </div>
                <p className='allPatients'><b>All doctors </b></p>
            </div>
            <div className='cardAnalysis'>
                <div className='number1'>
                    {countPatients}
                </div>
                <p className='allPatients'><b>All patients </b></p>
            </div>
            <div className='cardAnalysis'>
                <div className='number1'>
                    {numAppointments}
                </div>
                <p className=' text-center allPatients'><b>Total appointments </b></p>
            </div>
            <div className='cardAnalysis'>
                <div className='number1'>
                    {countTodays}
                </div>
                <p className=' text-center  allPatients'><b>Todays appointments </b></p>
            </div>
           </div>
            <ContactUs />
        </Layout>
    )
}
export default AdminHomePage;