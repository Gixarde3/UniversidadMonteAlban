
import './css/login.css';
import React from 'react';
import { useState} from 'react';
import Alert from './Alert';
import axios from 'axios';
import config from './config.json';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
function Login() {
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
    const navigate = useNavigate();  

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
                birthday: birthday
            });
            const data = response.data;
            if (data.success && data.cookie) {
                Cookies.set('session', data.cookie, { expires: 1 });
                Cookies.set('role', 1, { expires: 1 });
                Cookies.set('username', username, { expires: 1 });
                navigate('/')
            } else {
                openAlert("Registro fallido", "El usuario ya se encuentra registrado", "error", null);
                console.log(data);
            }
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
        }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
            <main>
                <section id="login">
                    <form onSubmit={handleSubmit}>
                        <img src="img/logo_azul.png" alt="Imagen del logo de la universidad" id="logo" />
                        <h1>Registrarse</h1>
                        <label htmlFor="name">Nombre</label>
                        <div className="input-div">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Ingresa tu(s) nombres"
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
                                placeholder="Ingresa tus apellidos"
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
                                placeholder="Ingresa tu correo electrónico"
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
                                placeholder="Ingresa tu fecha de nacimiento"
                                value={birthday}
                                onChange={(event) => setBirthday(event.target.value)}
                                required
                            />
                        </div>
                        <label htmlFor="Username">Nombre de usuario</label>
                        <div className="input-div">
                            <img src="img/icon_user.png" alt="Icono de usuario para iniciar sesión" />
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
                            <img src="img/icon_pass.png" alt="Icono de contraseña para iniciar sesión" />
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
                                <img src={"img/" + (showPassword ? "ver.png" : "no_ver.png")} alt="Icono para ver o esconder contraseña" />
                            </button>
                        </div>
                        <button type="submit" id="btn-iniciar" className='button'>Registrarse</button>
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
            </main>
    );
}

export default Login;
