import Layout from '../components/Layout';
import React, { useState } from 'react';
import { Col, Form, Row, Input, Badge, TimePicker, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { } from '../redux/features/userSlice';
import moment from 'moment';
import axios from 'axios';
import '../styles/ApplyDoctor.css';
import applyDoc from '../img/applyDoc.jpg';

const ApplyDoctor = () => {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = React.useState("");
    console.log(profilePic);
    const handleImageUploads = (e) => {
        const file = e.target.files[0];
        TransformFile(file);
    }
    const TransformFile = (file) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProfilePic(reader.result)
            };
        } else {
            setProfilePic("");
        }
    }
    
    const handleFinish = async (values) => {
        try {
            console.log(values)
            const res = await axios.post('/api/v1/user/apply-doctor', {

                ...values, userId: user._id,

                timings: [
                    moment(new Date(values.timings[0])).format('HH:mm'),
                    moment(new Date(values.timings[1])).format('HH:mm'),
                ],
                pic: profilePic
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                message.success(res.data.message);
                navigate("/");
            } else {
                message.error(res.data.success);
            }
        } catch (error) {
            console.log(error);
            message.error('something went wrong');
        }
    }
    return (
        <Layout>
            <img className='appDocImg' src={applyDoc}></img>
            <div className='textAboveForm'>
                <h3 className="text-center">Doctor application request form</h3>
                <p className='text-center'>Fill the form bellow and we will get back soon to you for more updates and information</p>
            </div>
            <Form className="ApplyForm" onFinish={handleFinish} autoComplete='off'>
           
                <h4>Personal Details</h4>
                <div className='personal'>


                    <Col>
                        <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                            <Input type="text" placeholder='your name' />
                        </Form.Item>
                    </Col>
                    <Col >
                        <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                            <Input type="text" placeholder='your last name' />
                        </Form.Item>
                    </Col>
                    <Col >
                        <Form.Item label="Phone" name="phone" required rules={[{ required: true }]}>
                            <Input type="text" placeholder='your phone number' />
                        </Form.Item>
                    </Col>
                    <Col>
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
                            <TimePicker.RangePicker format='HH:mm' />
                        </Form.Item>
                    </Col>

                </div>
                <input className="inputPicture" type='file' accept='image/' onChange={handleImageUploads} required placeholder='attach your image'/>
                
                <div className='button-cont'>
                    <button className='submitApplication' type='submit'>Submit</button>
                </div>

            </Form>

        </Layout>


    );
};
export default ApplyDoctor;