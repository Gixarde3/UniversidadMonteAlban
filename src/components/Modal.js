import {useState} from 'react';
import config from './config.json';
import Alert from './Alert';
import Markdown from 'react-markdown'
import './css/Modal.css';
function Modal({ isOpen, id_post, closeModal, imageSrc, imageAlt, title, description, file }) {
  const [alert, setAlert] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
    setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
    setAlertOpen(true);
  };
  const closeAlert = () => {
    setAlert(null);
    setAlertOpen(false);
  };
  const endpointLocal = config.endpointLocal;
  const handleDownload = () => {
    try{
    // Crea un enlace temporal para descargar el archivo
    const enlace = document.createElement('a');
    enlace.href = `${config.endpoint}/download/${file}`;
    enlace.download = file; // Cambia el nombre de descarga si es necesario

    // Simula un clic en el enlace para iniciar la descarga
    enlace.style.display = 'none';
    document.body.appendChild(enlace);
    enlace.click();

    // Elimina el enlace después de la descarga
    document.body.removeChild(enlace);

    }catch(error){
      openAlert('Error inesperado con la descarga', `Error de descarga: ${error}`, 'error', null);
    }
  };
  return isOpen ? (
    
    <div className="modal" >
      <button className="close-button" onClick={closeModal}>
          <img src={`${endpointLocal}img/close.png`} alt="Icono cerrar modal" />
      </button>
      <img src={imageSrc} alt={imageAlt} className="modal-img"/>
      <aside>
        <div id="modal-details">
          <h3 className="modal-title">{title}</h3>
          <Markdown className='modal-description'>{description}</Markdown>
          {file && file !== '' ? <button className="button" onClick={handleDownload}>Descargar archivo</button> : ''}
        </div>
      </aside>
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
  ) : null;
}
 
export default Modal;