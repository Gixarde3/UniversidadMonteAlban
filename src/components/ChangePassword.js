
import './css/login.css';
import React, { useEffect } from 'react';
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
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [lastnames, setLastnames] = useState('');
    const [birthday, setBirthday] = useState('');
    const [username, setUsername] = useState('');

    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    useEffect(() => {
        const getUser = async () => {
            try{
                openAlert("Cargando...", `Cargando información`, "loading", null, false, null);
                const cookie = Cookies.get('session');
                const response = await axios.get(`${prefix}/user/${cookie}`);
                const data = response.data;
                if(!data.success===false){
                    openAlert("Error al cargar la información", `La información no se ha podido cargar`, "error", "/");
                }else{
                    setName(data.name);
                    setEmail(data.email);
                    setLastnames(data.lastName);
                    setBirthday(data.birthdate);
                    setUsername(data.username);
                    closeAlert();
                }
            }catch(error){
                openAlert("Error al cargar la información", `La información no se ha podido cargar`, "error", "/");
            }
        }
        getUser();
    }, [prefix]);
    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
        setAlertOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const cookie = Cookies.get('session');
        const role = Cookies.get('role'); 
        try {
            openAlert("Cambiando contraseña...", `Cambiando contraseña...`, "loading", null)
            const response = await axios.post(`${prefix}/change-password`, {
                lastPassword: lastPassword,
                password: password,
                cookie: cookie
            });
            const data = response.data;
            if (data.success) {
                Cookies.set('session', data.cookie, { expires: 1 });
                openAlert("Cambio de contraseña exitoso", "Tu contraseña se ha cambiado con éxito", "success", null);
                if(role === 2 || role  === 3){
                    navigate('/admin');
                }else{
                    navigate('/')
                }
            } else {
                openAlert("Cambio de contraseña fallido", "Hubo un error con la contraseña anterior o tu sesión, corrige la contraseña anterior o inicia sesión de nuevo", "error", null);
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

    const handleUpdate = async (event) => {
        event.preventDefault();
        const cookie = Cookies.get('session');
        try{
            openAlert("Actualizando información...", `Actualizando información...`, "loading", null)
            const response = await axios.post(`${prefix}/user/edit/${cookie}`, {
                name: name,
                lastnames: lastnames,
                username: username,
                email: email,
                birthday: birthday
            });
            const data = response.data;
            if (data.success) {
                openAlert("Actualización de información exitosa", "Tu información se ha actualizado con éxito", "success", Cookies.get('role') === 2 ? "/" : "/admin");
            } else {
                openAlert("Actualización de información fallida", "Hubo un error inesperado con tu información, intenta de nuevo o reinicia sesión", "error", null);
            }
        }catch(error){
            openAlert("Error al editar la información", `La información no se ha podido editar`, "error", "/");
            
        }
    };

    return (
            <main>
                <section id="login">
                    <img src="img/logo_azul.png" alt="Imagen del logo de la universidad" id="logo" style={{filter:'none'}}/>
                    <h1>Administrar perfil</h1>
                    <form onSubmit={handleUpdate} style={{width: '100%'}}>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input type="email" name="email" id="email" value = {email} onChange={(event) => setEmail(event.target.value)}required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Nombre de usuario</label>
                            <input type="text" name="username" id="username" value = {username} onChange={(event) => setUsername(event.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Nombre(s)</label>
                            <input type="text" name="name" id="name" value = {name} onChange={(event) => setName(event.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Apellidos</label>
                            <input type="text" name="lastname" id="lastname" value = {lastnames} onChange={(event) => setLastnames(event.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthday">Fecha de nacimiento</label>
                            <input type="date" name="birthday" id="birthday" value = {birthday} onChange={(event) => setBirthday(event.target.value)} required/>
                        </div>
                        <button className="accept">Actualizar información</button>
                    </form>                
                    <form onSubmit={handleSubmit} style={{width: '100%'}}>
                        <h2>Cambiar contraseña</h2>
                        <div className="form-group">
                        <label htmlFor="password">Contraseña anterior</label>
                            <div className="input-div" style={{width:'100%'}}>
                                <img src="img/icon_pass.png" alt="Icono de contraseña para iniciar sesión" />
                                <input
                                    type={showLastPassword ? 'text' : 'password'}
                                    name="password"
                                    className="password"
                                    placeholder="Contraseña anterior"
                                    value={lastPassword}
                                    onChange={(event) => setLastPassword(event.target.value)}
                                    required
                                />
                                <button type="button" onClick={toggleLastPasswordVisibility} className="btn-mostrar">
                                    <img src={"img/" + (showLastPassword ? "ver.png" : "no_ver.png")} alt="Icono para ver o esconder contraseña" />
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-div" style={{width:'100%'}}>
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
