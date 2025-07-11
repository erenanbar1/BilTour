import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export default function DeletePage() {
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
    
        // Prepare the data for the request
        const deleteData = {
            emailAdress: email,
            password: password,
        };
    
        try {
            // Send HTTP DELETE request to your backend API endpoint
            const response = await fetch('http://localhost:8000/users/deleteuser/', {
                method: 'DELETE', // Set the HTTP method to DELETE
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify(deleteData), // Send the email and password in the request body
            });
    
            // Check if the response contains content before trying to parse it
            if (response.ok) {
                const text = await response.text(); // Read the response as plain text
    
                // If the response has content, parse it as JSON; otherwise, set success message directly
                if (text) {
                    const data = JSON.parse(text); // Parse the JSON response if content exists
                    console.log('Account deletion successful:', data);
                    setSuccessMessage('Your account has been deleted successfully!');
                } else {
                    setSuccessMessage('Your account has been deleted successfully!');
                }
    
                navigate('/'); // Optionally redirect to homepage after successful deletion
            } else {
                // Handle errors (e.g., show a message to the user)
                const errorResponse = await response.text(); // Get the error message as plain text
                setErrorMessage(errorResponse || 'Failed to delete account');
            }
        } catch (error) {
            console.error('Error:', error); // Log any errors to the console
            setErrorMessage('An error occurred while deleting the account.');
        }
    };
    

    return (
        <div className="text-center m-5-auto">
            <h2>Delete Account</h2>
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
                <p>
                    <button id="sub_btn" type="submit">Delete Account</button>
                </p>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    );
}
