import {useNavigate } from 'react-router-dom';
import './css/alert.css';
function Alert({ isOpen, title, message, kind, closeAlert, redirectRoute, asking, onAccept}) {
    const navigate = useNavigate();
    const redirectTo = () => {
      if(redirectRoute){
        navigate(redirectRoute);
      }else{
        closeAlert()
      }
    }
    const images = {
      'success': 'success.png',
      'error': 'error.png',
      'question': 'question.webp'
    }
    const accept = () => {
      closeAlert();
      onAccept();
    }
    return isOpen ? (
        <div className="alert">
          <div className="content-alert">
            
            
            <button className="close-alert" onClick={closeAlert}>
              <img src="img/close.png" alt="Icono cerrar la alerta" />
            </button>
            <h3>{title}</h3>
            <img src={"img/" + (images[kind])} alt="Icono de alerta" className="icon"/>
            <p>{message}</p>
            <div style={{display:'flex', width:'80%', justifyContent:'space-around'}}>
              <button className="accept" onClick={asking ? accept : redirectTo}>
                Aceptar
              </button>
              {
                asking ? (
                  <button className="accept" onClick={closeAlert} style={{backgroundColor: '#FE2A2A'}}>
                    Cancelar
                  </button>
                ) : ''
              }
            </div>
            </div>
        </div>
      ) : null;
}
 
export default Alert;