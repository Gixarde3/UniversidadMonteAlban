import './css/Header.css';
import { Link } from 'react-router-dom';
import Pages from './Pages';
import config from './config.json';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Alert from './Alert';
function HeaderFixed({newHeaderRef, isFromAdmin}) {
    const endpoitnLocal = config.endpointLocal;
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
            <div style={{
                display: 'flex',
                justifyContent:'space-around',
                alignContent:'center',
                position: 'fixed',
                width: '100vw',
                top: 0,
                left: 0
            }}
            ref={newHeaderRef}
            className='header header-fixed'
            >
                <div id="down" style={isFromAdmin ? {flexWrap: 'wrap', justifyContent:'space-between', paddingRight:'1rem'} : {}}>
                    <Link to="/" id="logo_container_fixed">
                            <img src={`${endpoitnLocal}img/Logo.webp`} alt="Imagen del logo de la universidad" id="logo"
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Universidad Monte Albán'
                                data-tooltip-place='bottom'
                            />
                    </Link>
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
 
export default HeaderFixed;
