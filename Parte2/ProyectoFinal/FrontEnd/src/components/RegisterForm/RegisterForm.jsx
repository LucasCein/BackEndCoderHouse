import { Link } from "react-router-dom";

const RegisterForm = ({ handleRegister, handleInputChange, formValues, error }) => {
    return (
        <div className='formContainer'>
            <form className="form">
                <section>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formValues.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Nombre"
                        value={formValues.first_name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Apellido"
                        value={formValues.last_name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="age"
                        placeholder="Edad"
                        value={formValues.age}
                        onChange={handleInputChange}
                    />
                    <div>
                        <label className="me-4">Rol: </label>
                        <select 
                            name="role" 
                            id="role" 
                            value={formValues.role}
                            onChange={handleInputChange}
                        >
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    {error ? <p>{error}</p> : null}
                </section>
                <section>
                    <button className='mt-5 mb-3 button' onClick={handleRegister}>Registrarse</button>
                    <Link to={"/login"}>
                        <button className='button'>Volver</button>
                    </Link>
                </section>
            </form>
        </div>
    );
};

export default RegisterForm;
