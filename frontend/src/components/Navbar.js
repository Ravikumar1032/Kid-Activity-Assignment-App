import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import "react-bootstrap"
function Navbar() {
  return (
    <div className='nav_cont'>
      {/* <div>
        <h3 className='text-white'>Parenting App</h3>
      </div>  */}
      <nav className="navbar">
      <ul className="list">
        <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/profile">Profile</Link></li> */}
        {/* <li><Link to="/activities">Activities</Link></li> */}
        {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
        <li><Link to="/addKids">Add Kids</Link></li>
        <li><Link to="/Activities">Activities</Link></li>
        <li><Link to="/KidsDashboard">Dashboard</Link></li>
        <li><Link to="/KidsInfo">Kids</Link></li>
      </ul>
    </nav>
    </div>
  );  
}

export default Navbar;
