import './css/Header.css';
import { Link } from 'react-router-dom';
function HeaderFixed() {
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
                <div id="down">
                    <Link to="/" id="logo_container_fixed">
                            <img src="img/logo.webp" alt="Imagen del logo de la universidad" id="logo" />
                    </Link>
                    <Link to="/">Inicio</Link>
                    <Link to="/oferta">Oferta Educativa</Link>
                    <Link to="/nosotros">Nosotros</Link>
                    <Link to="/publicaciones">Publicaciones</Link>
                    <Link to="/noticias">Noticias</Link>
                    <Link to="/buzon">Buzón de quejas</Link>
                    <Link to="/admisiones">Admisiones</Link>
                    <Link to="/login"><img src="img/login.png" alt="Icono para iniciar sesion" className = "icon_social_header"/></Link>
                </div>
            </header>
        );
}
 
export default HeaderFixed;