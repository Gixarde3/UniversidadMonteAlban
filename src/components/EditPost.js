import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from './Alert';
import config from './config.json';
import Cookies from 'js-cookie';
import { useLocation } from "react-router-dom";
function EditPost(){
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null); // Variable para almacenar el archivo de imagen
    const [adjuntFile, setFile] = useState(null);
    const [legend, setLegend] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [fileName, setFileName] = useState('');  
    const [quitFile, setQuitFile] = useState(false);
    const location = useLocation();
    const post = location.state.post;
    const endpoint = config.endpoint;
    const endpointImage = config.endpointImage;
    const endpointLocal = config.endpointLocal;
    useEffect(() => {
        if(post){
            setLegend(post.legend);
            setDescription(post.description);
            setTitle(post.title);
            setImage(endpointImage + "post/" +post.img);
            setFileName(post.route);
            setQuitFile(false);
        }
    },[post, endpointImage]);

    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    const handleImageUpload = (e) => {
        try{
            const selectedImage = e.target.files[0];
            setImageFile(e.target.files[0]);
            setImage(URL.createObjectURL(selectedImage));
        }catch(error){
            openAlert("Error inesperado", `La imagen no se ha podido cargar debido a un error inesperado ${error}`, "error", null);
        }
    };
    const handleFileUpload = (e) => {
        try{
            setFile(e.target.files[0]);
            setQuitFile(false);
        }catch(error){
            openAlert("Error inesperado", `El archivo no se ha podido cargar debido a un error inesperado: ${error}`, "error", null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('legend', legend);
        formData.append('description', description);
        if(imageFile) {formData.append('image', imageFile)};
        if(adjuntFile) {formData.append('file', adjuntFile)};
        if(quitFile) {formData.append('eliminarArchivo', quitFile)};
        formData.append('cookie', Cookies.get('session'));
        try {
            openAlert("Editando...", `Espere mientras se cargan las imágenes y archivos para editar la publicación`, "loading", null);
            const response = await axios.post(`${endpoint}/post/edit/${post.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Configura el encabezado para enviar datos multipart/form-data
                }
            });
            if(response.data.success === false){
                openAlert("Error inesperado", `La publicación no se ha podido editar debido a un error inesperado`, "error", null);
            }else{
                openAlert("Publicación creada", "La publicación se ha editado con éxito", "success", "/admin");
            }
        } catch (error) {
            if(error.response !== undefined && error.response.status === 422){
                openAlert("Error de archivos", `La publicación no se ha podido editar debido a un error con la subida de archivos`, "error", null);
            }else{
                openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
            }
           
        }
    };

    const askQuitFile = () => {
        openAlert("Quitar archivo adjunto", "¿Estás seguro de que deseas quitar el archivo adjunto?", "question", null, true, handleQuitFile);
    }
    const handleQuitRecentFile = () => {
        setFile(null);
        setFileName(null);
    }

    const handleQuitFile = () => {
        setQuitFile(true);
        setFile(null);
        setFileName(null);
    }
    return(
        <>
            <section className="section-admin">
                <h2 className='titleSection'>Editar publicación: </h2>
                <form onSubmit={handleSubmit} className='form-admin'>
                    <label htmlFor="title">Título</label>
                    <input type="text" placeholder="Ingresa el título de la publicación" value={title} id="title" onChange={(event) => setTitle(event.target.value)} required/>
                    <label htmlFor="filePublication">Imagen:</label>
                    {image ? (
                        <div className='image-input'>
                            <img src={image} alt="Preview" style={{ maxWidth: '90%' }} />
                        </div>
                    ) : <div>
                            <h3>Selecciona {image ? 'otra':'una'} imagen</h3>
                        </div>}
                    <div className="accept">
                        <label htmlFor="filePublication" id="btnArchivo">{image ? 'Cambiar':'Seleccionar'} imagen</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="file" id="filePublication"/>
                    </div>

                    {/*TODO quitar archivo*/}
                    <label htmlFor="fileAdjuntPublication">Archivo adjunto:</label>
                    {adjuntFile ? (
                        <div className="res" style={{width: '100%', position:'relative'}}>
                            <div className="result" style={{width: '100%', display: 'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                <p className="post-title">{adjuntFile.name}</p>
                                <button type="button" className="btn-admin eliminar"
                                    style={{alignItems:'flex-start',marginRight:'0'}}
                                    data-tooltip-id="tooltip"
                                    data-tooltip-content="Quitar archivo adjunto"
                                    data-tooltip-place="top"
                                    onClick={() => handleQuitRecentFile()}
                                >
                                    <img src={`${endpointLocal}img/close.png`} alt="Icono eliminar" />
                                </button>
                            </div>
                        </div>
                    ) : <div className="res" style={{width: '100%', position:'relative'}}>
                            <div className="result" style={{width: '100%', display: 'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                <p className="post-title">{fileName}</p>
                                <button type="button" className="btn-admin eliminar"
                                    style={{alignItems:'flex-start',marginRight:'0'}}
                                    data-tooltip-id="tooltip"
                                    data-tooltip-content="Quitar archivo adjunto"
                                    data-tooltip-place="top"
                                    onClick={() => askQuitFile()}
                                >
                                    <img src={`${endpointLocal}img/close.png`} alt="Icono eliminar" />
                                </button>
                                
                            </div>
                        </div>}
                    <div className="accept">
                        <label htmlFor="fileAdjuntPublication" id="btnArchivo">{adjuntFile || fileName !== '' ? 'Cambiar':'Seleccionar'} archivo</label>
                        <input type="file" accept="*/*" onChange={handleFileUpload} className="file" id="fileAdjuntPublication"/>
                    </div>
                    <label htmlFor="short-descrition">Descripción corta de la publicación</label>
                    <input type="text" placeholder="Ingresa una descripción corta de la publicación" value={legend} id="short-description" onChange={(event) => setLegend(event.target.value)} required/>
                    <label htmlFor="title">Descripción de la publicación</label>
                    <textarea placeholder="Ingresa la descripción de la publicación" value={description} id="description" onChange={(event) => setDescription(event.target.value)} required></textarea>
                    <button type="submit" className='accept'>Editar publicación</button>
                </form>
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
            </section>
        </>
        
    );
}

export default EditPost;