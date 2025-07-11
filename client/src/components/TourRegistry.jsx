import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export default function SignUpPage() {
    //School information
    const [schoolName, setSchoolName] = useState(''); 
    const [city, setCity] = useState(''); 
    
    //Coordinator information
    const [coordEmail, setEmail] = useState(''); 
    const [coordName, setCoordName] = useState('');
    const [coordPos, setPos] = useState('');
    const [coordPhoneNum, setPhoneNum] = useState('');
    
    //Tour information
    const [studentCount, setStCount] = useState('');
    const [tourDate, setDate] = useState('');
    const [tourTime, setTime] = useState('');

    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const requestBody = {
            schoolName: schoolName,
            schoolCity: city,
            counselarName: coordName,
            counselarEmail: coordEmail,
            counselarPosition: coordPos,
            counselarPhoneNumber: coordPhoneNum,
            studentCount: studentCount,
            date: tourDate,
            time: tourTime
        };

        try {
            const response = await fetch('http://localhost:8000/tours/create-tour/', {
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
                console.log('Tour created:', data);
                navigate('/'); // Redirect to home after successful registration
            } else {
                const errorResponse = await response.json(); // Parse error response
                setErrorMessage(errorResponse.message || 'Tour could not be created'); // Show error message
            }
        } catch (error) {
            console.error('Error:', error); // Log any errors to the console
            setErrorMessage('An error occurred while creating tour.'); // Show a generic error message
        }
    };

    return (
        <div>
            <h1 className='text-center'>Bilkent Üniversitesini Gezmek İçin Kaydolun</h1>
            <form onSubmit={handleSubmit}> {/* Handle form submission */}

                <div className="text-center">

                    <h2>Okul Bilgilerinizi Girin</h2>
                    <p>
                        <label>Okulunuzun İsmi</label><br />
                        <input
                            type="text"
                            name="School Name"
                            required
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)} // Update state on change
                        />
                    </p>
                    <p>
                        <label>Okulunuzun Bulunduğu Şehir</label><br />
                        <input
                            type="text"
                            name="City"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)} // Update state on change
                        />
                    </p>
                </div>

                <div className="text-center">

                    <h2>Danışman Hoca Bilgilerini Girin</h2>

                    <p>
                        <label>Danışmanın İsmi</label><br />
                        <input
                            type="text"
                            name="Coordinator Name"
                            required
                            value={coordName}
                            onChange={(e) => setCoordName(e.target.value)} // Update state on change
                        />
                    </p>
                    <p>
                        <label>Danışmanın Okuldaki Görevi</label><br />
                        <input
                            type="text"
                            name="Coordinator Position"
                            required
                            value={coordPos}
                            onChange={(e) => setPos(e.target.value)} // Update state on change
                        />
                    </p>
                    <p>
                        <label>Danışmanın E-mail Adresi</label><br />
                        <input
                            type="email"
                            name="Coordinator E-mail"
                            required
                            value={coordEmail}
                            onChange={(e) => setEmail(e.target.value)} // Update state on change
                        />
                    </p>
                    <p>
                        <label>Danışmanın Telefon Numarası</label><br />
                        <input
                            type="tel"
                            name="Coordinator Phone Number"
                            required
                            value={coordPhoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)} // Update state on change
                        />
                    </p>
                </div>

                <div className="text-center">

                    <h2>Tur Detaylarını Girin</h2>

                    <p>
                        <label>Öğrenci Sayısı</label><br />
                        <input
                            type="number"
                            name="Student Count"
                            required
                            value={studentCount}
                            onChange={(e) => setStCount(e.target.value)} // Update state on change
                        />
                    </p>
                    <p>
                        <label>Tur Tarihi</label><br />
                        <input
                            type="date"
                            name="Tour Date"
                            required
                            value={tourDate}
                            onChange={(e) => setDate(e.target.value)} // Update state on change
                        />
                    </p>
                    <p>
                        <label>Tur Saati</label><br />
                        <select
                            name="Tour Time"
                            required
                            value={tourTime}
                            onChange={(e) => setTime(e.target.value)}>

                            <option value=""></option>
                            <option value="1">09.00</option>
                            <option value="2">11.00</option>
                            <option value="3">13.00</option>
                            <option value="4">15.00</option>

                        </select>

                    </p>
                </div>

                <p>
                    <input
                        type="checkbox"
                        name="checkbox"
                        id="checkbox"
                        required
                    /> 
                    <span>Bilkent Üniversitesinin tur isteğini reddedebileceğini biliyor ve kabul ediyorum.</span>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Tur İsteğini Yolla</button>
                </p>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            </form>
            <footer>
                <p><Link to="/">Anasayfa</Link></p>
            </footer>
        </div>
    );
}
