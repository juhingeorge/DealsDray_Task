import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import '../styles/Registration.css'; 

const Registration = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [cnfPassword, setCnfPassword] = useState('');
    let navigate = useNavigate();

    let submitForm = () => {
        let payload = {
            name,
            email,
            cnfPassword,
        };
        if (!name || !email || !cnfPassword) {
            alert('To register, fill all the fields!');
        } else {
            if (password === cnfPassword) {
                axios
                    .post('http://localhost:4001/register', payload)
                    .then((e) => {
                        alert(e.data);
                        navigate('/');
                    })
                    .catch((e) => {
                        alert('Problem in sending data to the Backend.');
                    });
            } else {
                alert('Both passwords should be matched.');
            }
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-box">
                <h1 className="text-center font-bold text-2xl my-3">Admin Registration Form</h1>
                <div className="form-container">
                    <input
                        className="input-field"
                        placeholder="Enter Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className="input-field"
                        placeholder="Enter Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="input-field"
                        placeholder="Enter Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="input-field"
                        placeholder="Retype Password"
                        type="password"
                        value={cnfPassword}
                        onChange={(e) => setCnfPassword(e.target.value)}
                    />
                    <button className="submit-btn" onClick={submitForm}>
                        Register Me
                    </button>
                    <p className="signup-link">
                        Already have an account?{' '}
                        <Button variant="outlined">
                            <Link to="/">Sign In</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
