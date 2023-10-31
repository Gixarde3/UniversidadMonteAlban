
import './css/login.css';
import React from 'react';
import { useState} from 'react';
import Alert from './Alert';
import axios from 'axios';
import config from './config.json';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Ejemplo de uso para verificar si existe la cookie "session"

        try {
            const response = await axios.post(`${prefix}/login`, {
                username: username,
                password: password
            });
            const data = response.data;
            console.log(response);
            if (data.cookie) {
                Cookies.set('session', data.cookie, { expires: 1 });
                Cookies.set('role', data.role, { expires: 1 });
                console.log(typeof(data.role));
                if(data.role === '2' || data.role  === '3'){
                    navigate('/admin');
                }else{
                    navigate('/')
                }
            } else {
                openAlert("Inicio de sesion fallido", "Los datos ingresados no son correctos, prueba con otra contraseña o usuario.", "error", null);
            }
        } catch (error) {
            if(error.response !== undefined && error.response.status === 401){
                openAlert("Inicio de sesion fallido", "Los datos ingresados no son correctos, prueba con otra contraseña o usuario.", "error", null);
            }else{
                openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
            }
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
                        <h1>Inicio de sesión</h1>
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
                            <button onClick={togglePasswordVisibility} id="btn-mostrar">
                                <img src={"img/" + (showPassword ? "ver.png" : "no_ver.png")} alt="Icono para ver o esconder contraseña" />
                            </button>
                        </div>
                        <button type="submit" id="btn-iniciar" className='button'>Iniciar Sesión</button>
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
