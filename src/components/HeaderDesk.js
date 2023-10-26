import './css/Header.css';
import { Link } from 'react-router-dom';
import Pages from './Pages';
function HeaderDesk() {
        return (
        <header>
                <img src="img/Lineas.webp" alt="Lineas de adorno en el header" className="img_adorno"/>
                <Link to="/" id="logo_container">
                        <img src="img/logo.webp" alt="Imagen del logo de la universidad" id="logo" />
                </Link>
                <div id="parts">
                        <div id="down">
                                <Pages />
                        </div>
                </div>
        </header>
        );
}
 
export default HeaderDesk;