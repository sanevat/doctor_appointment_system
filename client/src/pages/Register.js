import React, { useState } from 'react';
import { Form, Input, Select, message } from 'antd';
import "../styles/RegisterStyle.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginPicture from '../img/loginPicture.jpg';
const { Option } = Select;

const Register = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //form handler
    const navigate = useNavigate();
    const onfinishHandler = async (values) => {
        try {
            const res = await axios.post('/api/v1/user/register', {
                ...values,
            })
            if (res.data.success) {
                message.success('Register Successfully!')
                navigate('/login')
            }
            else {
                message.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            message.error('something went wrong');
        }
    };

    return (
        <div className='main'>
            <div className="form-container">
                <Form className="register-form " layout="vertical" onFinish={onfinishHandler}>
                    <h3 className='textLoginForm text-center'>Register </h3>
                    <Form.Item label="Name" name="name" required className='name'>
                        <Input type=" text" required placeholder='Type your name here' className="input"
                            onChange={(e) => setName(e.target.value)}></Input>
                    </Form.Item>
                    <Form.Item label="Surname" name="surname" required className='name'>
                        <Input type=" text" required placeholder='Type your surname here' className="input"
                            onChange={(e) => setSurname(e.target.value)}></Input>
                    </Form.Item>
                    <Form.Item label="Email" name="email" required className='password'>
                        <Input type="email" placeholder='example@mail.com' className="input"
                            onChange={(e) => setEmail(e.target.value)} ></Input>
                    </Form.Item>
                    <Form.Item label="Password" name="password" required className='email'>
                        <Input type="password" placeholder='**********' className="input"
                            onChange={(e) => setPassword(e.target.value)}></Input>
                    </Form.Item>
                    {/*<input type='file' accept='image/' onChange={handleImageUploads} required />*/}

                    <div className='button-container'>
                        <button className="btnLogin btn-login">Register</button>
                    </div>
                    <br>
                    </br>
                    <div className='backRegisterContainer'>
                        <p class="or">or</p>
                        <Link to="/login" className=" backRegister m-2">Already user login here</Link>
                    </div>
                </Form>

            </div>

        </div >



    );
}
export default Register;