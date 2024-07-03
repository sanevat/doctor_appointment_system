import React from 'react';
import { Form, Input, Select, message } from 'antd';
import "../styles/RegisterStyle.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const onfinishHandler = async (values) => {
        try {
            const res = await axios.post('/api/v1/user/login', values);
            window.location.reload();
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                message.success('Login successfully');
                navigate('/');
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

            
            <Form className="register-form" layout="vertical" onFinish={onfinishHandler}>
                <h3 className=' textLoginForm text-center'>Log in to your account</h3>
                <Form.Item label="E-mail address" name="email" required className='email'> 
                    <Input type="email" placeholder='example@mail.com' className="input"></Input>
                </Form.Item>
                <Form.Item label="Password" name="password" required className='password'>
                    <Input type="password" placeholder='***********' className="input"></Input>
                </Form.Item>
                
                <div className='button-container'>
                <button className="btnLogin btn-login">Login</button>
                </div>
                <br>
                </br>
                <div className='backRegisterContainer'>
                <p class="or">or</p>
                <Link to="/register" className=" backRegister m-2">You cant log in, register here</Link>
                </div>
            </Form>
            </div>
        </div>
        
    );
}
export default Login;