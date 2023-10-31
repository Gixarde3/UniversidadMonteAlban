import { Link} from "react-router-dom";
import Cookies from "js-cookie";
function Pages() {
    return (
        <>
            <Link to="/">Inicio</Link>
            <Link to="/oferta">Oferta Educativa</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/publicaciones">Publicaciones</Link>
            <Link to="/buzon">Buzón de sugerencias</Link>
            <Link to="/admisiones">Admisiones</Link>
            {
                Cookies.get('session') ? <Link to="/password">Cambiar contraseña</Link> : ''
            }
            <Link to="/login"><img src="img/login.png" alt="Icono para iniciar sesion" className = "icon_social_header"/></Link>
        </>
    );
}

export default Pages;