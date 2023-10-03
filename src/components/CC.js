import Header from './Header'
import { Link } from 'react-router-dom';
function CC() {
        return (
            <div id="index">
                <Header/>
                <main>
                    <Link to="https://www.freepik.es/icono/facebook_747374#fromView=search&term=facebook&page=1&position=10&track=ais&track=ais">Icono de Freepik</Link>
                    <Link href="https://www.freepik.es/icono/whatsapp_1384023#fromView=search&term=whatsapp&page=1&position=0&track=ais&track=ais">Icono de Freepik</Link>
                    <Link href="https://www.freepik.es/icono/logotipo-gmail_60543#fromView=search&term=gmail&page=1&position=34&track=ais&track=ais">Icono de Google</Link>
                    <Link href="https://www.freepik.es/icono/flecha-abajo-navegar_32195#fromView=search&term=Flecha+abajo+&page=1&position=4&track=ais&track=ais">Icono de Freepik</Link>
                </main>
                <footer>
                </footer>
            </div>
        );
}
 
export default  CC;