import './css/Header.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
function Header() {
        const [menuOpen, setMenuOpen] = useState(false);

        const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
        };
        return (
        <header>
                <img src="img/Lineas.webp" alt="Lineas de adorno en el header" id="adorno"/>
                <Link to="/" id="logo_container">
                        <img src="img/logo.webp" alt="Imagen del logo de la universidad" id="logo" />
                </Link>
                <div id="parts">
                        <div id="up">
                                <div id="contact_information">
                                        <h3>Contáctanos:</h3>
                                        <Link to="https://www.facebook.com/UMonteAlban" className="social"><img src="img/facebook.png" alt="Facebook de Universidad Monte Albán" className = "icon_social_header"/>Facebook</Link>
                                        <Link to="https://api.whatsapp.com/send?phone=+527771430158&text=¡Estoy+interesad%40+en+que+me+informen+de+su+universidad%21+👋😀" className="social"><img src="img/whatsapp.png" alt="Whatsapp de Universidad Monte Albán" className = "icon_social_header"/>Whatsapp</Link>
                                        <Link to="mailto:universidadmontealban@gmail.com?Subject=Informes%20de%20la%20universidad" className="social"><img src="img/gmail.png" alt="Gmail de Universidad Monte Albán" className = "icon_social_header"/>Mail</Link>
                                </div>
                        </div>
                        <button onClick={toggleMenu} id="btn_toggle">Secciones <img src="img/flecha_abajo.png" alt="Botón para desplegar opciones" id="img_btn" className={`${menuOpen ? 'img_op' : 'img_nop'}`}/></button>
                        <div id="down" className={`menu-options ${menuOpen ? 'open' : ''}`}>
                                <Link to="/">Inicio</Link>
                                <Link to="/Oferta">Oferta Educativa</Link>
                                <Link to="/Nosotros">Nosotros</Link>
                                <Link to="/Publicaciones">Publicaciones</Link>
                                <Link to="/Buzon">Buzón de quejas</Link>
                                <Link to="/Admisiones">Admisiones</Link>
                        </div>
                </div>
        </header>
        );
}
 
export default Header;