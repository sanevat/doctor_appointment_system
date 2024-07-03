import React from 'react';
import Layout from '../components/Layout';
import { Tabs, message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import profilePic from '../img/profilePicture.png'
import '../styles/Notification.css';
const NotificationPage = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const handleMarkAllRead = async (req, res) => {
        try {
            const res = await axios.post('/api/v1/user/get-all-notification', { userId: user._id }
                , {
                    headers: {
                        Authorization
                            : `Bearer ${localStorage.getItem("token")}`,
                    },
                })
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
            }
            else {
                message.error(res.data.messgae);
            }
        } catch (error) {
            console.log(error);
            message.error('something went wrong')
        }
    }
    const handleDeleteAllRead = async () => {
        try {
            const res = await axios.post('/api/v1/user/delete-all-notification', {
                userId: user._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if (res.status.success) {
                message.success(res.data.message);
                window.location.reload();

            }
            else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            message.error("something went wrog in notifications")
        }
    }
    return (
        <Layout>
            <h4 className='p-3'>All notifications</h4>
            <Tabs>
                <Tabs.TabPane tab="unRead" key={0}>
                    <div className='d-flex justify-content-end'>
                        <h5 className='p-2' onClick={handleMarkAllRead} style={{ cursor: "pointer" }}>Mark All Read</h5>
                    </div>
                    {
                        user?.notification.map((notificationMes) => (
                            <div className='cardNotiffication'  >
                                <img className='profilePic' src={profilePic}></img>
                                <div className='card-text' onClick={() => navigate(notificationMes.onClickPath)}>
                                    {notificationMes.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>


                <Tabs.TabPane tab="Read" key={1}>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2' onClick={handleDeleteAllRead} style={{ cursor: "pointer" }}>Delete All Read</h4>
                    </div>

                    {
                        user?.seenNotification.map((notificationMes) => (

                            <div className='cardNotiffication'  >
                                <img className='profilePic' src={profilePic}></img>
                                <div className='card-text' onClick={() => navigate(notificationMes.onClickPath)}>
                                    {notificationMes.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}
export default NotificationPage;