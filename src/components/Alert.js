import {useNavigate } from 'react-router-dom';
import './css/alert.css';
function Alert({ isOpen, title, message, kind, closeAlert, redirectRoute }) {
    const navigate = useNavigate();
    const redirectTo = () => {
      if(redirectRoute){
        navigate(redirectRoute);
      }else{
        closeAlert()
      }
    }
    return isOpen ? (
        <div className="alert">
          <div className="content-alert">
            
            
            <button className="close-alert" onClick={closeAlert}>
              <img src="img/close.png" alt="Icono cerrar la alerta" />
            </button>
            <h3>{title}</h3>
            <img src={"img/" + (kind === 'success' ? "success.png" : "error.png")} alt="Icono de alerta" className="icon"/>
            <p>{message}</p>
            <button className="accept" onClick={redirectTo}>
              Aceptar
            </button>
          </div>
        </div>
      ) : null;
}
 
export default Alert;