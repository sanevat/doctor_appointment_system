import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import axios from 'axios';
import { Table, message } from 'antd';
const DoctorsAdmin = () => {
    const [doctors, setDoctors] = useState([]);
    //getUsers
    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/admin/changeAccountStatus', {
                doctorId: record._id, userId: record.userId, status: status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
            }
        } catch (error) {
            message.error('something went wrong')
        }
    }
    const getDoctors = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllDoctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getDoctors()
    }, []);
    //antd table co
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'

        },
        {
            title: 'Website',
            dataIndex: 'website'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Experience',
            dataIndex: 'experience'
        },
        {
            title: 'Fees Per Consultation',
            dataIndex: 'feesPerConsultation'
        },

        {
            title: 'Specialization',
            dataIndex: 'specialization'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === 'pending' ? <button className='btn btn-success' onClick={() => handleAccountStatus(record, 'approved')}>Approve</button> :
                        <button className='btn btn-danger' onClick={() => handleAccountStatus(record, 'rejected')}>Reject</button>}
                </div>
            )
        }
    ]
    return (
        <Layout>
            <div>
                <h1 className=" text-center m2 p-5">Doctors Applications</h1>
                <Table columns={columns} dataSource={doctors}>

                </Table>
            </div>
        </Layout>
    )
}
export default DoctorsAdmin;