import Comment from './Comment';
import {useEffect, useState} from 'react';
import axios from 'axios';
import config from './config.json';
import Cookie from 'js-cookie';
import AddComent from './AddComent';
import Alert from './Alert';
import './css/Modal.css';
function Modal({ isOpen, id_post, closeModal, imageSrc, imageAlt, title, description, file }) {
  const [coments, setComents] = useState([]);
  const [isLoading, setLoading] = useState(true);
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

  useEffect(() => {
    const getAllComents = async () => {
      if(isOpen){
        const prefix = config.endpoint;
        const response = await axios.get(`${prefix}/coment/${id_post}`);
        setComents(response.data);
        setLoading(false);
      }else{
        setLoading(true);
      }
    }
  
    getAllComents();
  }, [id_post, isOpen]);
  const getAllComents = async () => {
    if(isOpen){
      const prefix = config.endpoint;
      const response = await axios.get(`${prefix}/coment/${id_post}`);
      setComents(response.data);
      setLoading(false);
    }else{
      setLoading(true);
    }
  }
  const session = Cookie.get('session');
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
          <img src="img/close.png" alt="Icono cerrar modal" />
      </button>
      <img src={imageSrc} alt={imageAlt} className="modal-img"/>
      <aside>
        <div id="modal-details">
          <h3 className="modal-title">{title}</h3>
          <p className='modal-description'>{description}</p>
          {file && file !== '' ? <button className="button" onClick={handleDownload}>Descargar archivo</button> : ''}
        </div>
        {<div id="comments-container">
          <h4 className="modal-title">Comentarios</h4>
          <div id="comments">
            {isLoading ? (
              <h4 className='modal-title'>Cargando comentarios...</h4>
            ) : ( coments.length === 0) ? (
              <h4 className='modal-title'>No hay comentarios</h4>
            ) : (
              coments.map((coment, index) => (
                <Comment key={index} id_coment = {coment.id} userName={coment.username} coment={coment.content} isCreator={session === coment.cookie} reloadComents={getAllComents}/>
              ))
              )}
              </div>
              {session ? <AddComent id_post={id_post} reloadComents={getAllComents}/> : ''}
          
              </div>}
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