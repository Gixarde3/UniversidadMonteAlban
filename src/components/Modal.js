//import React, { useState } from 'react';
import Comment from './Comment';
import './css/Modal.css';
function Modal({ isOpen, closeModal, imageSrc, imageAlt, title, description }) {
    return isOpen ? (
        <div className="modal">
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
                <Comment userName="Gixarde3" comment="Comentario de prueba" time = "0 seconds" likes="999"/>
                <Comment userName="Gixarde3" comment="Comentario de prueba" time = "0 seconds" likes="999"/>
                <Comment userName="Gixarde3" comment="Comentario de prueba" time = "0 seconds" likes="999"/>
                <Comment userName="Gixarde3" comment="Comentario de prueba" time = "0 seconds" likes="999"/>
                <Comment userName="Gixarde3" comment="Comentario de prueba" time = "0 seconds" likes="999"/>
                <Comment userName="Gixarde3" comment="Comentario de prueba" time = "0 seconds" likes="999"/>
                <Comment userName="Gixarde3" comment="Comentario de prueba" time = "0 seconds" likes="999"/>
                <Comment userName="Gixarde3" comment="Comentario de prueba" time = "0 seconds" likes="999"/>
              </div>
            </div>
          </aside>
        </div>
      ) : null;
}
 
export default Modal;