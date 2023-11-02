import Comment from './Comment';
import {useEffect, useState} from 'react';
import axios from 'axios';
import config from './config.json';
import Cookie from 'js-cookie';
import AddComent from './AddComent';
import './css/Modal.css';
function Modal({ isOpen, id_post, closeModal, imageSrc, imageAlt, title, description, file }) {
  const [coments, setComents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getAllComents = async () => {
      if(isOpen){
        console.log(id_post);
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
      console.log(id_post);
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
    // URL del archivo que deseas descargar
    const fileURL = file;
  
    // Crea un elemento de enlace oculto
    const link = document.createElement('a');
    link.href = fileURL;
    const pathParts = fileURL.split('/');

    // El último elemento en el array `pathParts` será el nombre del archivo
    const fileName = pathParts[pathParts.length - 1];
    link.download = fileName; // Nombre del archivo descargado
    link.style.display = 'none';
  
    // Agrega el enlace al DOM
    document.body.appendChild(link);
  
    // Simula un clic en el enlace para iniciar la descarga
    link.click();
  
    // Elimina el enlace del DOM una vez que se ha iniciado la descarga
    document.body.removeChild(link);
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
          {file ? <button className="aceptar" onClick={handleDownload}>Descargar archivo</button> : ''}
        </div>
        <div id="comments-container">
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
          
        </div>
      </aside>
    </div>
  ) : null;
}
 
export default Modal;