import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [name, setName] = useState(""); // Declare state at the top level
    const navigate = useNavigate();

    // useEffect for fetching user name
    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    const handleLogout = () => {
        // Clear local storage or session storage
        localStorage.clear(); // Or use sessionStorage.clear() if applicable

        // Navigate to login page
        navigate('/');
    };

    return (
        <div>
            <div id='navbar'>
                <ul>
                    <li>
                        <Button variant="text">
                            <Link to='/homepage'>Home</Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant="text">
                            <Link to='/create-employee'>Create Employee</Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant="text">
                            <Link to="/employee-list">Employee List</Link>
                        </Button>
                    </li>
                    <li style={{ color: 'blue' }}>
                        {name} 
                        <Button variant="outlined" color="secondary" onClick={handleLogout} style={{ marginLeft: '8px' }}>
                        Logout
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
