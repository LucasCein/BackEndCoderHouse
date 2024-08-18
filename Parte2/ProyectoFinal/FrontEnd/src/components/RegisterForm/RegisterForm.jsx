import { Link } from "react-router-dom"

const RegisterForm = ({ handleRegister,handleEmailChange, handlePasswordChange, email, password, address,handleAddressChange }) => {
    return (
        <div className='formContainer' >
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
                    <input
                        type="text"
                        placeholder="Direccion"
                        value={address}
                        onChange={handleAddressChange}
                    />
                </section>
                <section>

                    <button className='mt-5 mb-3 button' onClick={handleRegister}>Registrarse</button>
                    <Link to={"/login"}>
                        <button className='button' >Volver</button>
                    </Link>
                </section>
            </form>
        </div>
    )
}

export default RegisterForm