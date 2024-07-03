import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Table} from'antd';
const ContactUs = () => {
    const [complaints, setComplaints] = useState([]);
    const getComplaints = async () => {
        try {
            const res = await axios.get('/api/v1/user/contactUsComplaints', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setComplaints(res.data.data);
            }
            else{
                console.log("pagja ovde");
            }
        } catch (error) {
            console.log("pagja ovde");
            console.log(error);
        }

    }
    useEffect(() => {
        getComplaints();
    }, [])
    const columns = [
        {
            title: 'User`s name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text, record) => {
                return (
                    <div>
                        {record.firstName} {record.lastName}
                    </div>
                )
            }

        },
        {
            title: 'Contact',
            dataIndex: 'phoneNumber',
            render: (text, record) => {
                return (
                    <div>
                        {record.phoneNumber}
                    </div>
                )
            }

        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: "Message",
            dataIndex: 'message'
        },
       
       

    ]
    return (
        <div>
            <div className='appList'>
            <p><b>Contacts and complaints from users</b></p>
            </div>
            <Table rowClassName={() => "rowClassName1"} className='tableAppointments' columns={columns} dataSource={complaints} />
        </div>
    )
}
export default ContactUs;