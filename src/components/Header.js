import './css/Components.css';
import { Link } from 'react-router-dom';
function Header() {
        return (
        <header>
                <div id="logo_container">
                        <img src="img/logo.png" alt="Imagen del logo de la universidad" id="logo"/>
                </div>
                <div id="contacto">
                        <Link to="https://www.google.com.ar/">Ir a Google</Link>
                        <p>Whatsapp</p>
                        <p>Correo</p>
                </div>
        </header>
        );
}
 
export default  Header;