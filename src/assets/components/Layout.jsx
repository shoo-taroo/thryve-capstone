import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; // Import the Footer component
import '../styles/Layout.css';

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="layout-container">
                <Outlet />
            </div>
            <Footer /> {/* Add Footer here */}
        </>
    );
}

export default Layout;
