import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../styles/EmployeeList.css';

const EmployeeList = () => {
    const [infoFromDB, setInfoFromDB] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [reload, setReload] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:4001/employee-list")
            .then((response) => {
                setInfoFromDB(response.data);
            })
            .catch((error) => {
                console.log("Error fetching employee data", error);
            });
        setReload(1);
    }, [reload]);

    const deleteUser = (id) => {
        axios.delete(`http://localhost:4001/employee-list/${id}`)
            .then(() => {
                setReload((prev) => prev + 1);
            })
            .catch((error) => {
                console.log("Error deleting user", error);
            });
    };

    // Filter data based on search term
    const filteredData = infoFromDB.filter((item) => {
        const lowerSearchTerm = searchTerm.toLowerCase();

        return (
            item.name.toLowerCase().includes(lowerSearchTerm) ||
            item.gender.toLowerCase().includes(lowerSearchTerm) ||
            item.designation.toLowerCase().includes(lowerSearchTerm) ||
            item.course.some((course) => course.toLowerCase().includes(lowerSearchTerm)) ||
            new Date(item.createdDate).toLocaleDateString().includes(lowerSearchTerm)
        );
    });

    return (
        <div>
            <div className="employee-list-container">
                {/* Search Field and Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                    {/* Total Count */}
                    <p>Total Count: {filteredData.length}</p>

                    {/* Search Section */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ position: 'relative', overflow: 'hidden', flexGrow: 1 }}>
                            <input
                                type="text"
                                placeholder=" "
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '8px',
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                            <span
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    whiteSpace: 'nowrap',
                                    animation: searchTerm ? 'none' : 'placeholderSlide 10s linear infinite',
                                    pointerEvents: 'none',
                                    color: '#999',
                                    fontSize: '14px',
                                    visibility: searchTerm ? 'hidden' : 'visible', // Hide placeholder when typing
                                }}
                            >
                                Search by name, gender, course, designation, or date
                            </span>
                        </div>
                        <Button variant="contained" color="primary" onClick={() => console.log("Search executed!")}>
                            Search
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <table>
                    <thead>
                        <tr>
                            <th className='px-7 py-2'>Unique Id</th>
                            <th className='px-7 py-2'>Image</th>
                            <th className='px-7 py-2'>Name</th>
                            <th className='px-7 py-2'>Email</th>
                            <th className='px-7 py-2'>Phone</th>
                            <th className='px-7 py-2'>Designation</th>
                            <th className='px-7 py-2'>Gender</th>
                            <th className='px-7 py-2'>Course</th>
                            <th className='px-7 py-2'>Create date</th>
                            <th className='px-12 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, i) => (
                            <tr key={item._id}>
                                <td>{i + 1}</td>
                                {/* <td><img src={`../../../backend/Images/${item.image}`} style={{ width: '50px', height: '50px' }}/></td> */}
                                <td>
                                    <img 
                                        src={`http://localhost:4001/images/${item.image}`} 
                                        alt={`${item.image}`} 
                                        style={{ width: '50px', height: '50px' }} 
                                    />
                                </td>
                                {/* <td><img src="https://via.placeholder.com/150" alt="Employee" style={{ width: '50px', height: '50px' }} /></td> */}
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.designation}</td>
                                <td>{item.gender}</td>
                                <td>{item.course.join(', ')}</td>
                                <td>{new Date(item.createdDate).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/edit-employee/${item._id}`}>Edit</Link>
                                    <Button variant="outlined" color="error" onClick={() => deleteUser(item._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style>
                {`
                    @keyframes placeholderSlide {
                        0% {
                            transform: translateX(0%);
                        }
                        100% {
                            transform: translateX(-100%);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default EmployeeList;

