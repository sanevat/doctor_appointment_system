import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { TimePicker, message } from "antd";
import doctorImage from '../img/doctorImage.jpg';
import CountUp from "react-countup";
import { Form, Input, Row, Col } from 'antd';
import { useSelector } from "react-redux";
import '../styles/HomePageStyles.css';
import surgeon from '../img/surgeon.jpg';
import cardio from '../img/cardio.jpg';
import surgery from '../img/surgery.jpg';
import sceleton from '../img/sceleton.jpg';
import microbiology from '../img/microbiology.jpg';
import imunology from '../img/imunology.jpg';
import vacine from '../img/vacine.jpg';
import dental from '../img/dental.jpg';
import logo from '../img/logo.png';
import DoctorList from '../components/DoctorList';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    //login user data
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();
    const [messgage, setMessage] = useState("");
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
    const { user } = useSelector(state => state.user);
    const handleFinish = async (values) => {
       
        try {
            console.log(values);
            const res = await axios.post('/api/v1/user/contactUs',
                {
                        ...values
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                message.success(res.data.message);
            }
            else {
                message.error(res.data.success);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            <section class="home" id="home">
                <img src={doctorImage} alt="sdfe" class="home__img" />
                <div class="home__container container grid">
                    <div class="home__data">
                        <h1 class="home__data-title">Providing Quality <b><span className='spanChangedColor'>Healthcare</span> <br /> For A <span className='spanChangedColor'>Brighter</span> And <span className='spanChangedColor'>Healthy Future</span></b></h1>
                        <p class="home__data-title">At our hospital we are dedicated to providing exceptional<br></br> medical care to our patients and...</p>
                        <div class="wave wave1"></div>
    <div class="wave wave2"></div>
    <div class="wave wave3"></div>

                    </div>

                </div>
            </section>
            <section>
                <div className='servicesProvided'>
                    <h1>Services we provide</h1>
                    <p>
                        We offer you a free doctor channeling service, Make your appointment now.
                    </p>
                    <div className='card-container'>
                        <div className='card'>
                            <img className="cardImg" src={surgery} />
                            <p className='title'>Pediatric Services</p>
                            <p className='cardTxt'>If you are expectng a child, follow-up care can be arranged prior to or after your hospital/birth discharge</p>
                        </div>
                        <div className='card'>
                            <img className="cardImg" src={cardio} />
                            <p className='title'>Echodiagrams</p>
                            <p className='cardTxt'>Associates is able to view the beating of the heart and many of its structures</p>
                        </div>
                        <div className='card'>
                            <img className="cardImg" src={sceleton} />
                            <p className='title'>Dermatology</p>
                            <p className='cardTxt'>Our providers are trained to handle a spectrum of skin conditions, covering the majority of your dermatology</p>
                        </div>
                    </div>
                    <div className='card-container'>
                        <div className='card'>
                            <img className="cardImg" src={imunology} />
                            <p className='title'>Women`s healthcare</p>
                            <p className='cardTxt'> Women`s health is a field covering numerious health concerns that women face, from reproductive health to mommograms</p>
                        </div>
                        <div className='card'>
                            <img className="cardImg" src={vacine} />
                            <p className='title'>Labaratory Testing</p>
                            <p className='cardTxt'>Labaratory orders are created within the patient`s electronic medical record(EHR) and transmitted to our labaratory. Once the sample is obtained</p>
                        </div>
                        <div className='card'>
                            <img className="cardImg" src={dental} />
                            <p className='title'>Dental treatments</p>
                            <p className='cardTxt'>Curing diseases and conditions that affect teeth structures, tooth restoration, dental cleanings, X-rays...</p>
                        </div>
                    </div>
                </div>


            </section>
            <div class="results-info">
                <h2 class="results-info-text">Our results in numbers</h2>
            </div>
            <section className="container circles">

                <div className="circle">
                    <CountUp
                        start={0}
                        end={1000}
                        delay={0}
                        enableScrollSpy={true}
                        scrollSpyDelay={500}
                    >
                        {({ countUpRef }) => (
                            <div className="counter">
                                <span ref={countUpRef} />+
                            </div>
                        )}
                    </CountUp>
                    <span className="circle-name">
                        Customer
                        <br />
                        Satisfaction
                    </span>
                </div>
                <div className="circle">
                    <CountUp
                        start={0}
                        end={250}
                        delay={0}
                        enableScrollSpy={true}
                        scrollSpyDelay={500}
                    >
                        {({ countUpRef }) => (
                            <div className="counter">
                                <span ref={countUpRef} />+
                            </div>
                        )}
                    </CountUp>
                    <span className="circle-name">
                        Verified
                        <br />
                        Doctors
                    </span>
                </div>
                <div className="circle">
                    <CountUp
                        start={0}
                        end={75}
                        delay={0}
                        enableScrollSpy={true}
                        scrollSpyDelay={500}
                    >
                        {({ countUpRef }) => (
                            <div className="counter">
                                <span ref={countUpRef} />+
                            </div>
                        )}
                    </CountUp>
                    <span className="circle-name">
                        Specialist
                        <br />
                        Doctors
                    </span>
                </div>
            </section>
            <div className='reasonsToChoose'>
                <div className='container1'>
                    <h1 className='textColored'>You have lots of reasons<br></br> to choose us</h1>
                    <p>An online scheduling service that help customers save time by reducing waiting time <br></br> and providing a link between patient and doctor for health reated issue.<br></br>We are dedicated to excellence in patient
                        care, aptient safety <br></br>and the quality of the reliably healthcare experience.</p>
                </div>
                <div className='container2'>
                    <img className='surgeonImg' src={surgeon} />
                </div>
            </div>


            <section id="doctors">
                <h2 className='teamMembers'>Meet our team members</h2>
                <div className=' cardsConatiner'>
                    {doctors && doctors.map(doctor => (

                        <DoctorList doctor={doctor} />
                    ))}
                </div>
            </section>
            <section className=' flex-center'>
                <p className='contactUs1'>Get In Touch</p>
                <h1 className='contactUs2'>Contact US</h1>
                <div className='form-container-contactUs'>
                    <Form onFinish={handleFinish}>
                        <Form.Item labelCol={{span:24}} label="First Name" name="firstName" class="form-label" required rules={[{ required: true }]}>
                            <Input type="text" class="form-control" id="inputName" placeholder='Enter your first name' />
                        </Form.Item>
                        <Form.Item labelCol={{span:24}} label="Last Name" name="lastName" class="form-label" required rules={[{ required: true }]}>
                            <Input type="text" class="form-control" id="inputLastName" placeholder='Enter your last name' />
                        </Form.Item>
                        <Form.Item labelCol={{span:24}} label="Email" name="email" class="form-label" required rules={[{ required: true }]}>
                            <Input type="text" class="form-control"id="inputEmail4" placeholder='Enter your email' />
                        </Form.Item>
                        <Form.Item labelCol={{span:24}} label="Phone Number" name="phoneNumber" class="form-label" required rules={[{ required: true }]}>
                            <Input type="text" class="form-control" id="phoneNumber" placeholder='Enter your phone number' />
                        </Form.Item>
                        <Form.Item labelCol={{span:24}}label="Message" name="message" class="form-label" required rules={[{ required: true }]}>
                            <Input type="text" class="form-control" id="message" placeholder='Type your message' />
                        </Form.Item>
                        <div class="col-md-12 contactUs-button-container">
                            <button type="submit" class="submitButtonContactUs">Submit</button>
                        </div>
                    </Form>

                </div>
            </section>
            <footer >
                <div className="footer">
                    <div className='footerComp1'>
                        <img src={logo}></img>

                    </div>

                    <div className='footerComp2'>
                        <p id='followUs'>Follow us</p>
                        <i class="fa-brands fa-facebook-f"></i><a href="/facebook">Facebook</a><br></br>
                        <i class="fa-brands fa-instagram"></i><a href="/facebook">Instagram</a><br></br>
                        <i class="fa-brands fa-twitter"></i> <a href="/facebook">Twitter</a><br></br>
                        <i class="fa-brands fa-linkedin"></i><a href="/facebook">Linkedin</a><br></br>
                    </div>
                    <div className='footerComp2'>
                        <p id='followUs'>Contact us</p>
                        <a href="/facebook">250Executive Park Blvd, Suite 3400 </a><br></br>
                        <a href="/facebook">San Francisco CA 94134 United STates</a><br></br>
                        <a href="/facebook">+123-456-789</a><br></br>
                        <a href="/facebook">info@gmail.com</a><br></br>
                    </div>
                </div>
                <div className='map'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38267.37381044049!2d22.016936168795596!3d53.169227013198984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471e315df87809af%3A0xbe7731e15257a616!2sCertus%20Agnieszka%20K%C5%82ys!5e0!3m2!1smk!2smk!4v1694084251806!5m2!1smk!2smk" width="1300" height="250" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                </div>
                <p id='copyRight' className='text-center p-2'>Copyright 2023<i class="fa-regular fa-copyright"></i> All rights reserved.</p>
            </footer>
        </Layout>
    );
}
export default HomePage;