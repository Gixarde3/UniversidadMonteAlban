import './css/Header.css';
import { Link } from 'react-router-dom';
function HeaderDesk() {
        return (
        <header>
                <img src="img/Lineas.webp" alt="Lineas de adorno en el header" className="img_adorno"/>
                <Link to="/" id="logo_container">
                        <img src="img/logo.webp" alt="Imagen del logo de la universidad" id="logo" />
                </Link>
                <div id="parts">
                        <div id="down">
                                <Link to="/">Inicio</Link>
                                <Link to="/oferta">Oferta Educativa</Link>
                                <Link to="/nosotros">Nosotros</Link>
                                <Link to="/publicaciones">Publicaciones</Link>
                                <Link to="/noticias">Noticias</Link>
                                <Link to="/buzon">Buzón de quejas</Link>
                                <Link to="/admisiones">Admisiones</Link>
                                <Link to="/login"><img src="img/login.png" alt="Icono para iniciar sesion" className = "icon_social_header"/></Link>
                        </div>
                </div>
        </header>
        );
}
 
export default HeaderDesk;