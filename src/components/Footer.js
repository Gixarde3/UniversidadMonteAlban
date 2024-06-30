import './css/Header.css';
import config from './config.json';
import { Link } from 'react-router-dom';
function Footer() {
    const endointLocal = config.endpointLocal;
    return (
            <footer>
                <section>
                    <h3>Universidad Monte Albán</h3>
                </section>
                <div className="contact_information">
                        <h3 className='title_c_information'>Contáctanos:</h3>
                        <Link to="https://www.facebook.com/UMonteAlban" className="social"><img src={`${endointLocal}img/facebook.png`} alt="Facebook de Universidad Monte Albán" className = "icon_social_header"/>Facebook</Link>
                        <Link to="https://api.whatsapp.com/send?phone=+527775646794&text=¡Estoy+interesad%40+en+que+me+informen+de+su+universidad%21+👋😀" className="social"><img src={`${endointLocal}img/whatsapp.png`} alt="Whatsapp de Universidad Monte Albán" className = "icon_social_header"/>Whatsapp</Link>
                        <Link to="mailto:universidadmontealban@gmail.com?Subject=Informes%20de%20la%20universidad" className="social"><img src={`${endointLocal}img/gmail.png`} alt="Gmail de Universidad Monte Albán" className = "icon_social_header"/>Mail</Link>
                </div>
                <section id="f_creative_commons">
                    <Link to="/CC" className="social">Creative Commons</Link>
                    <Link to="/privacidad" className='social'>Aviso de privacidad</Link>
                </section>
            </footer>
        );
}
 
export default Footer;