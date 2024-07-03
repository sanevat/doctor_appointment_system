import React, { useEffect, useState } from 'react';
import Layout from "./../../components/Layout";
import axios from 'axios';
import { Table, message } from 'antd';
const Users = () => {
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
    //antd table co
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Doctor',
            dataIndex: "isDoctor",
            render: (text, record) => (
                <span>{record.isDoctor ? 'Yes' : 'No'}</span>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className="d-flex">
                    <button className="btn btn-danger">Block</button>
                </div>
            )
        },

    ]
    return (
        <Layout>
            <h1 className="text-center m2 p-5">Users</h1>
            <Table columns={columns} dataSource={users}>

            </Table>
        </Layout>
    )
}
export default Users;