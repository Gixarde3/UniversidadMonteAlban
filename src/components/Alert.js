import {useNavigate } from 'react-router-dom';
import config from './config.json'
import './css/alert.css';
function Alert({ isOpen, title, message, kind, closeAlert, redirectRoute, asking, onAccept}) {
    const navigate = useNavigate();
    const endpointLocal = config.endpointLocal;
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
      'question': 'question.webp',
      'loading': 'loading.svg'
    }
    const accept = () => {
      closeAlert();
      onAccept();
    }
    return isOpen ? (
        <div className="alert">
          <div className="content-alert">
            
            
            <button className="close-alert" onClick={closeAlert}>
              <img src={`${endpointLocal}img/close.png`} alt="Icono cerrar la alerta" />
            </button>
            <h3>{title}</h3>
            <img src={`${endpointLocal}img/` + (images[kind])} alt="Icono de alerta" className="icon"/>
            <p style={{color:'black'}}>{message}</p>
            <div style={{display:'flex', width:'80%', justifyContent:'space-around'}}>
              {kind === 'loading' ? '' : <button className="accept" onClick={asking ? accept : redirectTo}>
                Aceptar
              </button>}
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