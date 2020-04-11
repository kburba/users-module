import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className="container">
            <h1>Dashboard</h1>
            <Link to="/orders">
                <button className="btn">Go to Orders</button>
            </Link>
            <Link to="/services">
                <button className="btn">Go to Services</button>
            </Link>
            <Link to="/languages">
                <button className="btn">Go to Languages</button>
            </Link>
        </div>
    );
}
