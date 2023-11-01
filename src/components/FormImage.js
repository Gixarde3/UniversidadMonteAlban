import React, { useState } from 'react';
import axios from 'axios';
import Alert from './Alert';
import config from './config.json';
import Cookies from 'js-cookie';
function FormImage(){
    const [image, setImage] = useState(null);
    const [legend, setLegend] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);

    const endpoint = config.endpoint;

    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
        setAlertOpen(true);
    };

    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        setImage(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('legend', legend);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('cookie', Cookies.get('session'));
        try {
            const response = await axios.post(`${endpoint}/create-publication`, formData);
            if(response.data.success === false){
                openAlert("Error inesperado", `La publicación no se ha podido crear debido a un error inesperado`, "error", null);
            }else{
                openAlert("Publicación creada", "La imagen se ha subido con éxito", "success", null);
            }
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
        }
    };

    
    return(
        <>
            <h2 className='titleSection'>Crear publicación nueva: </h2>
            <form onSubmit={handleSubmit} className='form-admin'>
                <label htmlFor="title">Título</label>
                <input type="text" placeholder="Ingresa el título de la publicación" id="title" onChange={(event) => setTitle(event.target.value)} required/>
                <label htmlFor="file">Imagen:</label>
                {image ? (
                    <div>
                        <img src={image} alt="Preview" style={{ maxWidth: '90%' }} />
                    </div>
                ) : <div>
                        <h3>Selecciona una imagen</h3>
                    </div>}
                <div className="btnForm">
                    <label htmlFor="file" id="btnArchivo">Seleccionar archivo</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} id="file" required/>
                </div>
                <label htmlFor="short-descrition">Descripción corta de la publicación</label>
                <input type="text" placeholder="Ingresa una descripción corta de la publicación" id="short-description" onChange={(event) => setLegend(event.target.value)} required/>
                <label htmlFor="title">Descripción de la publicación</label>
                <textarea placeholder="Ingresa la descripción de la publicación" id="description" onChange={(event) => setDescription(event.target.value)} required></textarea>
                {image && <button type="submit" className='btnForm'>Crear publicación</button>}
                
            </form>
            <Alert
                        isOpen={alertOpen}
                        closeAlert={closeAlert}
                        title={alert ? alert.title : ''}
                        message={alert ? alert.message : ''}
                        kind = {alert ? alert.kind : ''}
                        redirectRoute={alert ? alert.redirectRoute : ''}
                    />
        </>
        
    );
}

export default FormImage;