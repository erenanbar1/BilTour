import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState(''); // State for email
    const [newPassword, setNewPassword] = useState(''); // State for new password
    const navigate = useNavigate(); // Initialize the navigate function
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const requestBody = {
            emailAdress: email,
            password: newPassword,
        };

        try {
            const response = await fetch('http://localhost:8000/users/change-password/', {
                method: 'PUT', // Set the HTTP method to POST
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify(requestBody), // Convert the request body to JSON
            });

            // Handle the response
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                console.log('Password change successful:', data);
                setSuccessMessage('Your password has been changed successfully!'); // Set the success message

                // You can navigate to another page or show a success message here
                //navigate('/login'); // Redirect to the login page after successful password change
            } else {
                const errorResponse = await response.json(); // Parse error response
                alert(errorResponse.message || 'Failed to change password'); // Show an alert with the error message
            }
        } catch (error) {
            console.error('Error:', error); // Log any errors to the console
            alert('An error occurred while changing the password.'); // Show an alert on error
        }
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Reset your password</h2>
            <h5>Enter your email address and we will send you a new password</h5>
            <form onSubmit={handleSubmit}> {/* Handle form submission */}
                <p>
                    <label id="reset_pass_lbl">Email address</label><br />
                    <input
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update state on change
                    />
                </p>
                <p>
                    <label>New Password</label><br />
                    <input
                        type="password"
                        name="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} // Update state on change
                    />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Change password</button>
                </p>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    );
}

