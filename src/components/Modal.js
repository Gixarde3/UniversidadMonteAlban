import Comment from './Comment';
import {useEffect, useState} from 'react';
import axios from 'axios';
import config from './config.json';
import Cookie from 'js-cookie';
import AddComent from './AddComent';
import './css/Modal.css';
function Modal({ isOpen, id_post, closeModal, imageSrc, imageAlt, title, description }) {
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
  const session = Cookie.get('session');
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
        </div>
        <div id="comments-container">
          <h4 className="modal-title">Comentarios</h4>
          <div id="comments">
            {isLoading ? (
              <h4 className='modal-title'>Cargando comentarios...</h4>
            ) : ( coments.length === 0) ? (
              <h4 className='modal-title'>No hay comentarios</h4>
            ) : (
              coments.slice(0,30).map((coment, index) => (
                <Comment key={index} id_coment = {coment.id} userName={coment.username} coment={coment.content} isCreator={session === coment.cookie} />
              ))
            )}
          </div>
          <AddComent id_post={id_post} />
          
        </div>
      </aside>
    </div>
  ) : null;
}
 
export default Modal;