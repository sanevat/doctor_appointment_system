import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import moment from 'moment';
import '../styles/Appointments.css';
import { Table } from 'antd';
import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse'
const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/user/user-appointments', {
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
    const columns = [
        {
            title: 'Picture',
            dataIndex: 'pic',
            render: (text, record) => {
                return (

                    <img style={{ height :50 }}  className='profilePic'src={record.doctorInfo?.pic?.url} />

                )
            }
        },
        {
            title: 'Doctors name',
            dataIndex: 'doctorInfo.firstName',
            key: 'name',
            render: (text, record) => {
                return (
                    <div>
                        {record.doctorInfo.firstName} {record.doctorInfo.lastName}
                    </div>
                )
            }

        },
        {
            title: 'Contact',
            dataIndex: 'phone',
            render: (text, record) => {
                return (
                    <div>
                        {record.doctorInfo.phone}
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
       

    ]
    return (
        <Layout>
            <div className='appList'>
            <p><b>Appointments list</b></p>
            </div>
            <Table rowClassName={() => "rowClassName1"} className='tableAppointments' columns={columns} dataSource={appointments} />
        </Layout>
    )
}
export default Appointments;