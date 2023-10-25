import './css/Header.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
function HeaderFixed() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
            <header style={{
                display: 'flex',
                justifyContent:'space-around',
                alignContent:'center',
                position: 'fixed',
                width: '100vw',
                zIndex: 9,
                top: 0,
                left: 0
            }}>
                <div id="down" className={`menu-options ${menuOpen ? 'open' : ''}`} >
                                <Link to="/" id="logo_container_fixed">
                                        <img src="img/logo.webp" alt="Imagen del logo de la universidad" id="logo" />
                                </Link>
                                <Link to="/">Inicio</Link>
                                <Link to="/Oferta">Oferta Educativa</Link>
                                <Link to="/Nosotros">Nosotros</Link>
                                <Link to="/Publicaciones">Publicaciones</Link>
                                <Link to="/Noticias">Noticias</Link>
                                <Link to="/Buzon">Buzón de quejas</Link>
                                <Link to="/Admisiones">Admisiones</Link>
                                <Link to="/Admin"><img src="img/login.png" alt="Icono para iniciar sesion" className = "icon_social_header"/></Link>
                        </div>
            </header>
        );
}
 
export default HeaderFixed;