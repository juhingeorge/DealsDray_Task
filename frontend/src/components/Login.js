import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import '../styles/login.css';

const Login = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let navigate = useNavigate();

    // let login = () => {
    //     let payload = { email, password };
    //     axios.post('http://localhost:4001/login', payload)
    //         .then((response) => {
    //             if (response.data.status === "success") {
    //                 // Store user details in localStorage
    //                 localStorage.setItem('userID', response.data.id);
    //                 localStorage.setItem('userName', response.data.name);

    //                 // Navigate to dashboard
    //                 navigate(`/dashbord/${response.data.id}`);
    //             } else if (response.data.status === "fail") {
    //                 alert("Wrong password");
    //             } else if (response.data.status === "noUser") {
    //                 alert("Invalid Email");
    //             }
    //         })
    //         .catch((err) => console.error("Login failed:", err));
    // };
    let login = () => {
        let payload = { email, password };
        axios.post('http://localhost:4001/login', payload)
            .then((response) => {
                if (response.data.status === "success") {
                    // Store user details in localStorage
                    localStorage.setItem('userID', response.data.id);
                    localStorage.setItem('userName', response.data.name);
    
                    // Navigate to the homepage (instead of dashboard)
                    navigate('/homepage');
                } else if (response.data.status === "fail") {
                    alert("Wrong password");
                } else if (response.data.status === "noUser") {
                    alert("Invalid Email");
                }
            })
            .catch((err) => console.error("Login failed:", err));
    };
    

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="text-center font-bold text-2xl my-3">Login Form</h1>
                <div className="login-form">
                    <input
                        className='input-field'
                        placeholder='Email'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='input-field'
                        placeholder='Password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='submit-btn' onClick={login}>LOGIN</button>
                    <p className="signup-link">
                        Do not have an account?
                        <Button variant="outlined">
                            <Link to='/register'>Sign Up</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

