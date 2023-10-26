import './css/Page.css';
import './css/login.css';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const prefix = 'http://localhost:8000/api';
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${prefix}/login`, {
                username: username,
                password: password,
            });
            const data = response.data;
            console.log(response);
            if (data.cookie) {
                document.cookie = `session=${data.cookie}`;
                navigate('/');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error in Axios request:', error);
        }
    };

    

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
        <div>
            <Header />
            <main>
                <section id="login">
                    
                    <form onSubmit={handleSubmit}>
                        <img src="img/logo_azul.png" alt="Imagen del logo de la universidad" id="logo" />
                        <h1>Acceso</h1>
                        <h4>Ingresa todos los datos para iniciar sesión</h4>
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
                        <button type="submit" id="btn-iniciar">Iniciar Sesión</button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Login;
