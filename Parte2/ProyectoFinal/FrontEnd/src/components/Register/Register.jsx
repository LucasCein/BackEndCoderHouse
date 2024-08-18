import { useState } from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";


const Register = () => {

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        age: '',
        role: 'user',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/auth/registerUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    // en vez de alert, guardar en estado y mostrar en pantalla
                    setError(data.error);
                }
            });

        
        navigate('/login');

        console.log('Form Values:', formValues);
    };


    return (
        <section className='back'>
            <div className='containerDiv'>
                <div className="login-form">
                    <h2>Registrarse</h2>
                    <RegisterForm
                        handleRegister={handleRegister}
                        handleInputChange={handleInputChange}
                        formValues={formValues}
                        error={error}
                    />
                </div>
            </div>
        </section>
    );
};

export default Register;
