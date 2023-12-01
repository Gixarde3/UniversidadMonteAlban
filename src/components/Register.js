
import './css/login.css';
import React from 'react';
import { useState} from 'react';
import Alert from './Alert';
import axios from 'axios';
import config from './config.json';
import Cookies from 'js-cookie';
function Register() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const prefix = config.endpoint;  
    const endpointLocal = config.endpointLocal;
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
        setAlertOpen(true);
    };

    const checkEmail = (email) => {
        const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(regexMail.test(email)){
            setValidEmail(true);
        }else{
            setValidEmail(false);
        }
    }

    const setValidEmailValue = (email) => {
        checkEmail(email);
        setEmail(email);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Ejemplo de uso para verificar si existe la cookie "session"

        if(validEmail === false){
            openAlert("Correo electrónico inválido", "El correo electrónico ingresado no es válido", "error", null);
            return;
        }
        try {
            openAlert("Registrando...", `Se está registrando en nuestro sistema`, "loading", null, false, null);
            const response = await axios.post(`${prefix}/register`, {
                username: username,
                password: password,
                name: name,
                lastName: lastName,
                email: email,
                birthday: birthday,
                cookie: Cookies.get('session')
            });
            if(response.data.success === false){
                openAlert("Registro fallido", `El usuario ya existe en el sistema`, "error", null, false, null);
                return;
            }
            openAlert("Registro exitoso", `Se ha registrado exitosamente en nuestro sistema`, "success", null, false, null);
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
        }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
        <>
            <section id="login">
                <form onSubmit={handleSubmit} style={{width:'100%'}}>
                    <label htmlFor="name">Nombre</label>
                    <div className="input-div">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Ingresa su(s) nombres"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <label htmlFor="lastname">Apellidos:</label>
                    <div className="input-div">
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="Ingresa sus apellidos"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            required
                        />
                    </div>
                    <label htmlFor="mail">Correo electrónico:</label>
                    <div className="input-div">
                        <input
                            type="text"
                            name="mail"
                            id="mail"
                            placeholder="Ingresa su correo electrónico"
                            value={email}
                            onChange={(event) => setValidEmailValue(event.target.value)}
                            required
                        />
                    </div>
                    {validEmail === false ? <div className="error">
                        <p>El correo electrónico es inválido.</p>
                    </div> : null}
                    <label htmlFor="birthday">Fecha de nacimiento:</label>
                    <div className="input-div">
                        <input
                            type="date"
                            name="birthday"
                            id="birthday"
                            placeholder="Ingresa su fecha de nacimiento"
                            value={birthday}
                            onChange={(event) => setBirthday(event.target.value)}
                            required
                        />
                    </div>
                    <label htmlFor="Username">Nombre de usuario</label>
                    <div className="input-div">
                        <img src={`${endpointLocal}img/icon_user.png`} alt="Icono de usuario para iniciar sesión" />
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                    </div>
                    <label htmlFor="password">Contraseña</label>
                    <div className="input-div">
                        <img src={`${endpointLocal}img/icon_pass.png`} alt="Icono de contraseña para iniciar sesión" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <button type="button" onClick={togglePasswordVisibility} id="btn-mostrar">
                            <img src={`${endpointLocal}img/` + (showPassword ? "ver.png" : "no_ver.png")} alt="Icono para ver o esconder contraseña" />
                        </button>
                    </div>
                    <button type="submit" id="btn-iniciar" className='button'>Registrar administrador</button>
                </form>
            </section>
            <Alert
                isOpen={alertOpen}
                closeAlert={closeAlert}
                title={alert ? alert.title : ''}
                message={alert ? alert.message : ''}
                kind = {alert ? alert.kind : ''}
                redirectRoute={alert ? alert.redirectRoute : ''}
            />
        </>
    );
}

export default Register;
