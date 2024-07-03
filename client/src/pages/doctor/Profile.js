import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Form, Row, Input, Badge, TimePicker, message, Upload, Button, UploadOutLined } from 'antd';
import moment from 'moment';
import applyDoc from '../../img/applyDoc.jpg';
import '../../styles/ApplyDoctor.css';
const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const handleFinish = async (values) => {
        try {
            const res = await axios.post('/api/v1/doctor/updateProfile',
                {
                    ...values, userId: user._id, timings: [
                        moment(values.timings[0]).format("HH:mm"),
                        moment(values.timings[1]).format("HH:mm"),
                    ],
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                message.success(res.data.success);
                navigate("/");
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error('something went wrong');
        }
    }
    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorInfo',
                { userId: params.id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            if (res.data.success) {
                setDoctor(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getDoctorInfo()
    }, []);

    return (
        <Layout>
            <img className='appDocImg' src={applyDoc}></img>
            <div className='textAboveForm'>
                <h3 className="text-center">Update Profile</h3>
            </div>
            {doctor && (
                <Form className="ApplyForm"  onFinish={handleFinish} initialValues=
                    {{
                        ...doctor,
                        timings: [
                            moment(doctor.timings[0], "HH:mm"),
                            moment(doctor.timings[1], "HH:mm"),

                        ]
                    }}>
                    <h4>Personal Details</h4>
                    <div className='personal'>
                 
                        <Col >
                            <Form.Item label="Fisrt Name" name="firstName" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your name' />
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your last name' />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label="Phone" name="phone" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your phone number' />
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item label="Website" name="website" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your website' />
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your email' />
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your address' />
                            </Form.Item>
                        </Col>
                  
                    </div>
                   
                    <h4>Professional Details</h4>
                    <div className='professional'>
                  
                        <Col >
                            <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]} >
                                <Input type="text" placeholder='your specialization' />
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your experience' />
                            </Form.Item>
                        </Col>

                        <Col >
                            <Form.Item label="feesPerConsultation" name="feesPerConsultation" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your feesPerConsultation' />
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item label="Timings" name="timings" required >
                                <TimePicker.RangePicker format='HH:mm'></TimePicker.RangePicker>
                            </Form.Item>
                        </Col>

                   
                    </div>
                    <div className='button-cont'>
                    <button className='submitApplication' type='submit'>Update</button>
                    </div>
                  
                </Form>
            )}
        </Layout>
    )
}
export default Profile;