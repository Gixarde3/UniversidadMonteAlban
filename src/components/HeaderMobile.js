import './css/Header.css';
import './css/HeaderMobile.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Pages from './Pages';
function HeaderMobile() {
        const [menuOpen, setMenuOpen] = useState(false);

        const toggleMenu = () => {
                setMenuOpen(prevState => !prevState);
        };
        const [isSticky, setIsSticky] = useState(false);

        // Agrega un manejador de desplazamiento para detectar cuándo se debe volver pegajoso
        const handleScroll = () => {
            if (window.scrollY > 100) { // Cambia 100 a la posición que desees
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        // Agrega un evento para detectar el desplazamiento
        useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);
        return (
            
        <header className={isSticky ? "sticky-header" : ""}>
            <div id="up">
                <Link to="/" id="logo_container">
                        <img src="img/logo.webp" alt="Imagen del logo de la universidad" id="logo" />
                </Link>
                <h3>Menú</h3>
                <div id="parts">
                        <button onClick={toggleMenu} id="btn_toggle"><img src="img/flecha_abajo.png" alt="Botón para desplegar opciones" id="img_btn" className={`${menuOpen ? 'img_op' : 'img_nop'}`}/></button>
                </div>
            </div>
            <div id="down" className={`menu-options ${menuOpen ? 'open' : ''}`}>
                <Pages />
            </div>
        </header>
        );
}
 
export default HeaderMobile;