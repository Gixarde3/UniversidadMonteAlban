import './css/Page.css';
import React from 'react';
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
function CC() {
        useEffect(() => {
            document.title = 'Universidad Monte Albán - Creative Commons';
        }, []);
        return (
            <>
                <Header/>
                <main>
                    <Link to="https://www.freepik.es/icono/facebook_747374#fromView=search&term=facebook&page=1&position=10&track=ais&track=ais">Icono de Freepik</Link>
                    <Link to="https://www.freepik.es/icono/whatsapp_1384023#fromView=search&term=whatsapp&page=1&position=0&track=ais&track=ais">Icono de Freepik</Link>
                    <Link to="https://www.freepik.es/icono/logotipo-gmail_60543#fromView=search&term=gmail&page=1&position=34&track=ais&track=ais">Icono de Google</Link>
                    <Link to="https://www.freepik.es/icono/flecha-abajo-navegar_32195#fromView=search&term=Flecha+abajo+&page=1&position=4&track=ais&track=ais">Icono de Freepik</Link>
                </main>
                <Footer/>
            </>
        );
}
 
export default  CC;