import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgetPasswordPage from './components/ForgetPasswordPage';
import HomePage from './components/HomePage';
import DeletePage from './components/DeletePage';
import TourRegistry from './components/TourRegistry';
import './App.css';

export default function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Update to use "element" prop with JSX */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forget-password" element={<ForgetPasswordPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/delete-account" element={<DeletePage />} />
                    <Route path="/register-tour" element={<TourRegistry />} />
                </Routes>
            </div>
        </Router>
    );
}

const Footer = () => {
    return (
        <p className="text-center" style={FooterStyle}>
            Designed & coded by <a href="https://izemspot.netlify.com" target="_blank" rel="noopener noreferrer">IZEMSPOT</a>
        </p>
    );
}

const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    padding: "1rem",
    margin: 0,
    width: "100%",
    opacity: ".5"
};
