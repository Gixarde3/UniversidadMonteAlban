import './css/Header.css';
import { Link } from 'react-router-dom';
import Pages from './Pages';
import config from './config.json';
import Cookies from 'js-cookie';
import Alert from './Alert';
import { useState } from 'react';
function HeaderDesk({headerRef, isFromAdmin}) {
        const endpointLocal = config.endpointLocal;
        const [alert, setAlert] = useState(null);
        const [alertOpen, setAlertOpen] = useState(false);
        const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
                setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
                setAlertOpen(true);
        };
        const closeAlert = () => {
                setAlert(null);
                setAlertOpen(false);
        };
        const logout = () => {
                openAlert("¿Seguro?", `¿Desea cerrar sesión? Fue un gusto tenerlo en nuestra página`, "question", null, true, deleteSession);
        }
        const deleteSession = () => {
                Cookies.remove('session');
                Cookies.remove('role');
                Cookies.remove('username');
                window.location.reload();
        }
        return (
        <div ref={headerRef} className='header'>
                <img src={`${endpointLocal}img/Lineas.webp`} alt="Lineas de adorno en el header" className="img_adorno"/>
                <Link to="/" id="logo_container">
                        <img src={`${endpointLocal}img/logo.webp`} alt="Imagen del logo de la universidad" id="logo" />
                </Link>
                <div id="parts">
                        <div id="down" style={isFromAdmin ? {flexWrap: 'wrap', marginTop:'1.2rem', alignItems:'center', justifyContent:'flex-end', padding:'1rem'} : {}}>
                                {
                                        isFromAdmin ? (
                                                Cookies.get('username') ? (
                                                        <button type="button" onClick={()=>(logout())} style={{cursor:'pointer', display: 'flex', alignItems: 'center', flexDirection:'row'}}>
                                                                <p style={{fontSize: '20px'}}>{Cookies.get('username')}</p>
                                                                <p style={{fontSize: '20px'}}>({Cookies.get('role') === '3' ? "Superadministrador" : "Administrador" })</p>
                                                                <img src={`${endpointLocal}/img/login.png`} alt="Icono para cerrar sesion" className = "icon_social_header"/>
                                                        </button>
                                                ):(
                                                        <p>No deberías estar aquí</p>
                                                )
                                        ) : (<Pages />)
                                }
                        </div>
                </div>
                <Alert
                        isOpen={alertOpen}
                        closeAlert={closeAlert}
                        title={alert ? alert.title : ''}
                        message={alert ? alert.message : ''}
                        kind = {alert ? alert.kind : ''}
                        redirectRoute={alert ? alert.redirectRoute : ''}
                        asking = {alert ? alert.asking : ''}
                        onAccept={alert ? () => alert.onAccept() : () => console.log('')}
                />
        </div>
        );
}
 
export default HeaderDesk;