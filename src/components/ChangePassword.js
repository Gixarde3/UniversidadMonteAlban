
import './css/login.css';
import React from 'react';
import { useState} from 'react';
import Alert from './Alert';
import axios from 'axios';
import config from './config.json';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
function ChangePassword() {
    const [lastPassword, setLastPassword] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showLastPassword, setShowLastPassword] = useState(false);
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
        const cookie = Cookies.get('session');
        const role = Cookies.get('role'); 
        try {
            const response = await axios.post(`${prefix}/change-password`, {
                password: password,
                cookie: cookie
            });
            const data = response.data;
            console.log(response);
            if (data.success) {
                Cookies.set('session', data.cookie, { expires: 1 });
                openAlert("Cambio de contraseña exitoso", "Tu contraseña se ha cambiado con éxito", "success", null);
                if(role === 2 || role  === 3){
                    navigate('/admin');
                }else{
                    navigate('/')
                }
            } else {
                openAlert("Cambio de contraseña fallido", "Hubo un error con tu sesión, inicia sesión otra vez e intenta de nuevo", "error", null);
            }
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
        }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const toggleLastPasswordVisibility = () => {
        setShowLastPassword(!showLastPassword);
    };

    return (
            <main>
                <section id="login">
                    <form onSubmit={handleSubmit}>
                        <img src="img/logo_azul.png" alt="Imagen del logo de la universidad" id="logo" />
                        <h1>Cambiar contraseña</h1>
                        <label htmlFor="password">Contraseña anterior</label>
                        <div className="input-div">
                            <img src="img/icon_pass.png" alt="Icono de contraseña para iniciar sesión" />
                            <input
                                type={showLastPassword ? 'text' : 'password'}
                                name="password"
                                className="password"
                                placeholder="Contraseña anterior"
                                value={password}
                                onChange={(event) => setLastPassword(event.target.value)}
                                required
                            />
                            <button type="button" onClick={toggleLastPasswordVisibility} className="btn-mostrar">
                                <img src={"img/" + (showLastPassword ? "ver.png" : "no_ver.png")} alt="Icono para ver o esconder contraseña" />
                            </button>
                        </div>
                        <div className="input-div">
                            <img src="img/icon_pass.png" alt="Icono de contraseña para iniciar sesión" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="password"
                                placeholder="Contraseña nueva"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="btn-mostrar">
                                <img src={"img/" + (showPassword ? "ver.png" : "no_ver.png")} alt="Icono para ver o esconder contraseña" />
                            </button>
                        </div>
                        <button type="submit" id="btn-iniciar" className='button' >Cambiar contraseña</button>
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

export default ChangePassword;
