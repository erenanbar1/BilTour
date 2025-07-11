import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useNavigate } from 'react-router-dom';  
  

export default function LoginPage() {
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
    const navigate = useNavigate(); // Initialize the navigate function
    const [failureMessage, setFailureMessage] = useState(''); // State for success message
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Prepare the data for the request
        const loginData = {
            emailAdress: email,
            password: password,
        };

        try {
            // Send HTTP request to your backend API endpoint   
            console.log('http://localhost:8000/users/login/')
            const response = await fetch('http://localhost:8000/users/login/', { // Replace with your actual API URL
                method: 'POST', // Set the HTTP method
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify(loginData),

            });

            // Handle the response
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                console.log('Login successful:', data);
                setIsLoggedIn(true); // Update login status
                navigate('/home'); // Use navigate to change the route
                // Redirect or handle successful login (you can use history.push here)
            } else {
                // Handle errors (e.g., show a message to the user)
                const errorResponse = await response.json(); // Parse error response
                setFailureMessage('Login failed!'); // Set the success message

                alert(errorResponse.message || 'Login failed'); // Show an alert with the error message
            }
        } catch (error) {
            console.error('Error:', error); // Log any errors to the console
            alert('An error occurred while logging in.'); // Show an alert on error
        }
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}> {/* Handle form submission */}
                <p>
                    <label>Email Address</label>
                    <br />
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} // Update state on change
                    />
                </p>
                <p>
                    <label>Password</label>
                    <br />
                    <input 
                        type="password" 
                        name="password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} // Update state on change
                    />
                </p>
                <Link to="/forget-password">
                    <label className="right-label">Forget password?</label>
                </Link>
                <Link to="/delete-account">
                    <label className="right-label">Delete account</label>
                </Link>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            {failureMessage && <p className="failure-message">{failureMessage}</p>} {}
            <footer>
                <p>Don't have an account? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    );
}
