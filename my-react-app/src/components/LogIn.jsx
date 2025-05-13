import React, { useState } from 'react';

const LoginComponent = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [shouldRegister, setShouldRegister] = useState(false);

    // Registration state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    const validateLogin = () => {
        if (!name || !password) {
            setError("שם וסיסמה נדרשים.");
            return false;
        }
        return true;
    };

    const validateRegistration = () => {
        if (!firstName || !lastName || !phone || !email) {
            setError("שם פרטי, שם משפחה, טלפון ואימייל נדרשים.");
            return false;
        }

        // בדיקת תקינות עבור ID
        const idNumber = parseInt(id, 10);
        if (isNaN(idNumber) || idNumber <= 0) {
            setError("מספר זהות חייב להיות מספר חיובי.");
            return false;
        }

        return true;
    };
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        // בדוק אם הקלט הוא מספר
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            setPassword(value); // שמור את הערך כ-string
            setError(''); // נקה שגיאות אם הקלט תקין
        } else {
            setError("הסיסמה חייבת להיות מספרית.");
        }
    };
    
    // בתוך ה-JSX
    <input
        type="text" // שים לב שהשינוי כאן הוא ל-text כדי לאפשר הכנסת תווים
        value={password}
        onChange={handlePasswordChange} // השתמש במתודה החדשה
        required
    />
    console.log('Sending data:', { name, password: parseInt(password, 10) });
    const handleLogin = async (event) => {
        event.preventDefault();
        if (!validateLogin()) return;

      
        
            try {
                const response = await fetch('https://localhost:7240/api/Values/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, password}), // המרה ל-INT
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log('Login successful:', data);
                    // Handle successful login redirection or actions
                } else {
                    const text = await response.text();
                    const data = text ? JSON.parse(text) : { message: "No content returned." };
                    setError(data.message);
                    if (response.status === 401) {
                        setShouldRegister(true);
                    }
                }
            } catch (error) {
                setError(error.message);
            }
        };
        
    const handleRegistration = async () => {
        if (!validateRegistration()) return;

        try {
            const registrationData = {
                Id: parseInt(id, 10), // ID is now included
                FirstName: firstName,
                LastName: lastName,
                Phone: phone,
                Email: email,
            };

            const response = await fetch('https://localhost:7240/api/Values/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                // Redirect or show a success message
            } else {
                const text = await response.text();
                const data = text ? JSON.parse(text) : { message: "Registration failed." };
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleIdChange = (e) => {
        const value = e.target.value;
        // המרה ל-INT עם בדיקת תקינות
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue) && intValue > 0) {
            setId(value);
            setError(''); // Clear error if valid
        } else {
            setError("מספר זהות חייב להיות מספר חיובי.");
        }
    };

    return (
        <div>
            <h2>כניסת משתמש</h2>
            {!shouldRegister ? (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>שם:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>סיסמה:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button type="submit">כניסה</button>
                </form>
            ) : (
                <div>
                    <h3>הרשמה</h3>
                    <div>
                        <label>מספר זהות:</label>
                        <input
                            type="text"
                            id="id"
                            value={id}
                            onChange={handleIdChange} // Use new handler
                            required
                        />
                    </div>
                    <div>
                        <label>שם פרטי:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>שם משפחה:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>טלפון:</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>אימייל:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button onClick={handleRegistration}>הירשם</button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default LoginComponent;
