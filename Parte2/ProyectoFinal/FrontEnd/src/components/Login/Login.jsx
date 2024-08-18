import { useState, useEffect } from 'react';
import './login.css';
import LoginForm from '../LoginForm/LoginForm';

import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8080/api/auth/loginUser', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    // en vez de alert, guardar en estado y mostrar en pantalla
                setError(data.error);
                }
                else {
                    navigate('/');
                }

            });
    };


    return (
        <section className='back'>
            <div className='containerDiv'>
                <div className="login-form">
                    <h2>Iniciar sesión</h2>
                    <LoginForm
                        handleEmailChange={handleEmailChange}
                        handleLogin={handleLogin}
                        handlePasswordChange={handlePasswordChange}
                        email={email}
                        password={password}
                        error={error}
                    />
                </div>
            </div>
        </section>
    );
};

export default Login;
