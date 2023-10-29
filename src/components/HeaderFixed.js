import './css/Header.css';
import { Link } from 'react-router-dom';
import Pages from './Pages';
import PagesAdmin from './PagesAdmin';
function HeaderFixed({isFromAdmin}) {
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
                <div id="down" style={isFromAdmin ? {flexWrap: 'wrap', justifyContent:'center'} : {}}>
                    <Link to="/" id="logo_container_fixed">
                            <img src="img/logo.webp" alt="Imagen del logo de la universidad" id="logo" />
                    </Link>
                    {
                        isFromAdmin ? <PagesAdmin /> : <Pages />
                    }
                </div>
            </header>
        );
}
 
export default HeaderFixed;