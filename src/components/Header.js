import './css/Components.css';

function Header() {
        return (
        <header>
                <div id="logo_container">
                        <img src="img/logo.png" alt="Imagen del logo de la universidad" id="logo"/>
                </div>
                <div id="contacto">
                        <p>Facebook</p>
                        <p>Whatsapp</p>
                        <p>Correo</p>
                </div>
        </header>
        );
}
 
export default  Header;