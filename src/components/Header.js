import './css/Components.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
function Header() {
        const [menuOpen, setMenuOpen] = useState(false);

        const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
        };
        return (
        <header>
                <div id="up">
                        <div id="logo_container">
                                <img src="img/logo.png" alt="Imagen del logo de la universidad" id="logo"/>
                        </div>
                        <div id="contact_information">
                                <h3>Contáctanos:</h3>
                                <Link to="https://www.facebook.com/UMonteAlban" className="social"><img src="img/facebook.png" alt="Facebook de Universidad Monte Albán" className = "icon_social_header"/>Facebook</Link>
                                <Link to="https://api.whatsapp.com/send?phone=+527771430158&text=¡Estoy+interesad%40+en+que+me+informen+de+su+universidad%21+👋😀" className="social"><img src="img/whatsapp.png" alt="Whatsapp de Universidad Monte Albán" className = "icon_social_header"/>Whatsapp</Link>
                                <Link to="mailto:universidadmontealban@gmail.com?Subject=Informes%20de%20la%20universidad" className="social"><img src="img/gmail.png" alt="Gmail de Universidad Monte Albán" className = "icon_social_header"/>E-Mail</Link>
                        </div>
                </div>
                <button onClick={toggleMenu} id="btn_toggle">Secciones </button>
                <div id="down" className={`menu-options ${menuOpen ? 'open' : ''}`}>
                        <Link to="/">Inicio</Link>
                        <Link to="/Oferta" className='opc'>Oferta Educativa</Link>
                        <Link to="/Nosotros" className='opc'>Nosotros</Link>
                        <Link to="/Publicaciones" className='opc'>Publicaciones</Link>
                        <Link to="/Buzon" className='opc'>Buzon de quejas</Link>
                        <Link to="/Admisiones" className='opc'>Admisiones</Link>
                </div>
        </header>
        );
}
 
export default Header;