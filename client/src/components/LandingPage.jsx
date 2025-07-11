import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/LandingPage.css';
export default function LandingPage() {
    return (
        <div className="buttons-container">  {/* Flex container */}
            <div className="buttons text-center"> {/* Nested flex container for buttons */}
                <h1> Welcome !</h1>
                <Link to="/login">
                    <button className="primary-button">Log In</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn">
                        <span>Register User</span>
                    </button>
                </Link>
                <Link to="/register-tour">
                    <button className="primary-button" id="reg_btn">
                        <span>Register For Tour</span>
                    </button>
                </Link>
                
            </div>
        </div>
    );
}
