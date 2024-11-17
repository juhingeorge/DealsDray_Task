import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EmployeeList.css';

const EditEmployee = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState('');
  let [phone, setPhone] = useState();
  let [designation, setDesignation] = useState();
  let [gender, setGender] = useState();
  let [courses, setCourses] = useState([]);
  let [image, setImage] = useState();

  let idObj = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4001/employee-list/${idObj.ID}`)
      .then((e) => {
        setName(e.data.name);
        setEmail(e.data.email);
        setPhone(e.data.phone);
        setDesignation(e.data.designation);
        setGender(e.data.gender);
        setCourses(e.data.course);
      })
      .catch(() => { console.log("error"); });
  }, [idObj.ID]);

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCourses([...courses, value]);
    } else {
      setCourses(courses.filter(course => course !== value));
    }
  };

  // Form submit handler
  let formHandle = (e) => {
    e.preventDefault();
    let payload = {
      name: name,
      email: email,
      phone: phone,
      image: image,
      designation: designation,
      gender: gender,
      course: courses
    };
    axios.put(`http://localhost:4001/employee-list/${idObj.ID}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((e) => { alert(e.data); })
      .catch(() => { console.log("error"); });

    navigate("/employee-list");
  };

  return (
    <div className="edit-employee-container">
      <h1>Update Employee Data</h1>
      <div className="form-container">
        <input
          className="input-field"
          placeholder="Enter Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Enter Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Enter Phone Number"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Designation dropdown */}
        <label htmlFor="designation">Designation</label>
        <select
          name="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="input-field"
        >
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>

        {/* Gender radio buttons */}
        <label>Gender:</label><br></br>
        <input
          type="radio"
          id="male"
          name="gender"
          value="Male"
          checked={gender === 'Male'}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="male"> Male </label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="Female"
          checked={gender === 'Female'}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="female"> Female </label>
        <br></br>
        {/* Course checkboxes */}
        <label>Course:</label><br></br>
        <input
          type="checkbox"
          id="MCA"
          name="course"
          value="MCA"
          checked={courses.includes('MCA')}
          onChange={handleCheckboxChange}
        /> 
        <label htmlFor="MCA">MCA</label>

        <input
          type="checkbox"
          id="BCA"
          name="course"
          value="BCA"
          checked={courses.includes('BCA')}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="BCA">BCA</label>

        <input
          type="checkbox"
          id="BSC"
          name="course"
          value="BSC"
          checked={courses.includes('BSC')}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="BSC">BSC</label>
        <br></br>
        {/* Image upload */}
        <label htmlFor="image">Upload your photo</label>
        <input
          className="input-field"
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="submit-button" onClick={formHandle}>Update Changes</button>
      </div>
    </div>
  );
};

export default EditEmployee;
