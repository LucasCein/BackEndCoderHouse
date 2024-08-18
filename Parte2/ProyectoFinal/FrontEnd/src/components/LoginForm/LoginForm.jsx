import { Link } from 'react-router-dom';
import './loginForm.css';

const LoginForm = ({ handleLogin, handleEmailChange, handlePasswordChange, email, password, error }) => {
    return (
        <div className='formContainer'>
            <form className="form">
                <section>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </section>
                {error && error !== 'logged' && <p style={{ color: 'red' }}>{error}</p>}
                <section>
                    <button className='mt-5 mb-3 button' onClick={handleLogin}>Iniciar sesión</button>
                    <Link to={"/register"}>
                        <button className='button'>Registrarse</button>
                    </Link>
                </section>
            </form>
        </div>
    );
};

export default LoginForm;
