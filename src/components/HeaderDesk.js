import './css/Header.css';
import { Link } from 'react-router-dom';
import Pages from './Pages';
import PagesAdmin from './PagesAdmin';
import config from './config.json';
function HeaderDesk({isFromAdmin}) {
        const endpoitnLocal = config.endpointLocal;
        return (
        <header>
                <img src={`${endpoitnLocal}img/Lineas.webp`} alt="Lineas de adorno en el header" className="img_adorno"/>
                <Link to="/" id="logo_container">
                        <img src={`${endpoitnLocal}img/logo.webp`} alt="Imagen del logo de la universidad" id="logo" />
                </Link>
                <div id="parts">
                        <div id="down" style={isFromAdmin ? {flexWrap: 'wrap', justifyContent:'center', marginTop:'1.2rem'} : {}}>
                                {
                                        isFromAdmin ? <PagesAdmin /> : <Pages />
                                }
                        </div>
                </div>
        </header>
        );
}
 
export default HeaderDesk;