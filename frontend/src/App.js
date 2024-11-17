import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import EditEmployee from "./components/EditEmployee";
import Navbar from './components/Navbar';
import Homepage from "./components/Homepage";
import logo from './assets/logo.jpeg';

function App() {
  return (
    <div className="bg-neutral-300 h-auto w-screen">
      <div>
        <img  src={logo}  alt="Employee"  style={{ width: '50px', height: '50px', marginLeft: '10px' }}  />
      </div>
      <BrowserRouter>
        <AppWithRouter />
      </BrowserRouter>
    </div>
  );
}

function AppWithRouter() {
  const location = useLocation();

  // Conditional rendering: Don't show Navbar on Login and Registration pages
  const hideNavbar = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {/* Render Navbar only if we are not on the Login or Registration pages */}
      {!hideNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/edit-employee/:ID" element={<EditEmployee />} />
      </Routes>
    </>
  );
}

export default App;

