import { Link} from "react-router-dom";
import Cookies from "js-cookie";
import {useState}  from "react";
import Alert from "./Alert";
function Pages() {
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };
    const carreras = [
        "Licenciatura en psicología",
        "Licenciatura en idiomas",
        "Tu preparatoria en línea"
    ];
    const [open, setOpen] = useState(false);
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
        <>
            <Link to="/">Inicio</Link>
            <ul className="menu">
                <li className={open ? "open" : ""} onClick={()=>(setOpen(!open))}> 
                <div className="sep" style={{
                    display:'flex',
                    flexDirection:'row'
                }}>
                    Oferta educativa
                    <img src="img/flecha_abajo.png" alt="Boton para submenu" style={open ? {
                        transform: 'rotate(180deg)',
                        transition: 'transform 0.3s ease',
                        filter: 'invert(1)',
                        marginLeft: '0.2rem',
                        width: '20px',
                        height: '20px'
                    } : {
                        transition: 'transform 0.3s ease',
                        filter: 'invert(1)',
                        width: '20px',
                        marginLeft: '0.2rem',
                        height: '20px'
                    }}/>
                </div>
                    <ul className="submenu">
                    {
                        carreras.map((carrera) => (
                            <li><Link to={`oferta/${carrera}`}>{carrera}</Link></li>
                        ))
                    }   
                    </ul>
                </li>
            </ul>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/publicaciones">Publicaciones</Link>
            <Link to="/buzon">Sugerencias</Link>
            <Link to="/admisiones">Admisiones</Link>
            {Cookies.get('role') === "2" || Cookies.get('role') === "3" ? <Link to="/admin">Administración</Link> : ''}
            {
                Cookies.get('session') ? <Link to="/password">Perfil</Link> : ''
            }
            
            {Cookies.get('session') ? <button type="button" onClick={()=>(logout())} style={{cursor:'pointer', display: 'flex', alignItems: 'center', flexDirection:'row'}}>{Cookies.get('username') ? <p style={{fontSize: '20px'}}>{Cookies.get('username')}</p> : ''}<img src="img/login.png" alt="Icono para cerrar sesion" className = "icon_social_header"/></button>: <Link to="/login"><img src="img/loginUser.png" alt="Icono para iniciar sesion" className = "icon_social_header"/></Link>}

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
        </>
    );
}

export default Pages;