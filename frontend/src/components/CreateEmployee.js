
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom'; 
import Button from '@mui/material/Button'; 
import '../styles/CreateEmployee.css';

const CreateEmployee = () => {
    let navigate = useNavigate();
    let [name, setName] = useState("");
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [designation, setDesignation] = useState('');
    let [gender, setGender] = useState("");
    let [course, setCourse] = useState([]);
    let [image, setImage] = useState();

    let formHandle = (e) => {
        e.preventDefault();
        let payload = {
            name: name,
            email: email,
            phone: phone,
            image: image,
            designation: designation,
            gender: gender,
            course: course
        };

        if (!name || !email || !phone || !designation || !gender || !course || !image) {
            alert("To Create Employee Fill all the fields..!");
        } else {
            axios.post("http://localhost:4001/employees", payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((e) => { alert(e.data); })
                .catch(() => { console.log("can not register"); });

            navigate("/employee-list");
        }
    };

    let handleCourseChange = (e) => {
        const course1 = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setCourse(course.concat(course1));
        } else {
            setCourse(course.filter(item => item !== course1));
        }
    };

    return (
    <div>
      {/* Navbar */}
      {/* <div id="navbar">
        <ul>
          <li>Home</li>
          <li>
            <Button variant="text">
              <Link to="/create-employee">Create Employee</Link>
            </Button>
          </li>
          <li>
            <Button variant="text">
              <Link to="/employee-list">Employee List</Link>
            </Button>
          </li>
          <li className="text-red-500">{name}</li>
          <li>Logout</li>
        </ul>
      </div> */}
        <div className="create-employee-container">
            <h1 className="create-employee-header">Create Employee</h1>
            <div className="form-container">
                <input
                    className="input-field"
                    placeholder="Enter Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <input
                    className="input-field"
                    placeholder="Enter Email"
                    type="text"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <input
                    className="input-field"
                    placeholder="Enter Phone Number"
                    type="text"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                />

                {/* Designation dropdown */}
                <label>Designation</label>
                <select
                    className="select-field"
                    onChange={(e) => { setDesignation(e.target.value); }}
                    required
                >
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>

                {/* Gender radio button */}
                <label>Gender:</label><br />
                <input type="radio" id="male" name="gender" value={gender} onChange={() => setGender("Male")} />
                <label htmlFor="male"> Male </label>
                <input type="radio" id="female" name="gender" value={gender} onChange={() => setGender("Female")} />
                <label htmlFor="female"> Female </label><br />

                {/* Courses checkboxes */}
                <label>Course:</label><br />
                <input
                    type="checkbox"
                    id="MCA"
                    name="course"
                    value="MCA"
                    checked={course.includes('MCA')}
                    onChange={handleCourseChange}
                />
                <label htmlFor="MCA"> MCA </label>
                <input
                    type="checkbox"
                    id="BCA"
                    name="course"
                    value="BCA"
                    checked={course.includes('BCA')}
                    onChange={handleCourseChange}
                />
                <label htmlFor="BCA"> BCA </label>
                <input
                    type="checkbox"
                    id="BSC"
                    name="course"
                    value="BSC"
                    checked={course.includes('BSC')}
                    onChange={handleCourseChange}
                />
                <label htmlFor="BSC"> BSC </label><br />

                {/* File upload */}
                <label>Upload your photo</label><br />
                <input
                    className="file-input"
                    accept="image/jpeg, image/png"
                    type="file"
                    name="image"
                    onChange={(e) => { setImage(e.target.files[0]) }}
                /><br />

                <button className="register-button" onClick={formHandle}>Register Me</button>
            </div>
        </div>
        </div>
    );
};

export default CreateEmployee;
