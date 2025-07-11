import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export default function SignUpPage() {
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const requestBody = {
            emailAdress: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:8000/users/register/', {
                method: 'POST', // Set the HTTP method to POST
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify(requestBody), // Convert the request body to JSON
            });

            console.log(response)
            // Handle the response
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                console.log('Registration successful:', data);
                navigate('/login'); // Redirect to home after successful registration
            } else {
                const errorResponse = await response.json(); // Parse error response
                setErrorMessage(errorResponse.message || 'Registration failed'); // Show error message
            }
        } catch (error) {
            console.error('Error:', error); // Log any errors to the console
            setErrorMessage('An error occurred while registering.'); // Show a generic error message
        }
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handleSubmit}> {/* Handle form submission */}
                <p>
                    <label>Email address</label><br />
                    <input
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update state on change
                    />
                </p>
                <p>
                    <label>Password</label><br />
                    <input
                        type="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update state on change
                    />
                </p>
                <p>
                    <input
                        type="checkbox"
                        name="checkbox"
                        id="checkbox"
                        required
                    /> 
                    <span>I agree to all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a>.</span>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    );
}
