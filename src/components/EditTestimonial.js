import React from "react";
import axios from 'axios';
import config from './config.json';
import Cookies from 'js-cookie';
import {useState, useEffect} from 'react';
import Alert from './Alert';
import { useLocation } from "react-router-dom";
import './css/testimonial.css';
function EditTestimonial(){
    const location = useLocation();
    const testimonial = location.state ? location.state.testimonial : null;
    const [idTestimonial, setIdTestimonial] = useState(-1);
    const [name, setName] = useState('');
    const [relation, setRelation] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const endpointImage = config.endpointImage;
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    useEffect(() => {
        if(testimonial){
            setIdTestimonial(testimonial.id);
            setName(testimonial.name);
            setRelation(testimonial.relation);
            setImage(endpointImage + "testimonial/" +testimonial.img);
            setContent(testimonial.content);
            setDate(testimonial.date);
        }
    }, [testimonial, endpointImage]);

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
            openAlert("Error al subir la imagen", "Ocurrió un error inesperado al subir la imagen", "error", null);
        }
    };

    const handleSubmit = async (event) => {
        try{
            const cookie = Cookies.get('session');
            event.preventDefault();
            const formData = new FormData();
            formData.append('name', name);
            formData.append('relation', relation);
            formData.append('testimonial', content);
            if(imageFile){
                formData.append('image', imageFile);
            }
            formData.append('cookie', cookie);
            
            const response = await axios.post(`${endpoint}/testimonial/edit/${idTestimonial}`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data', // Configura el encabezado para enviar datos multipart/form-data
                }
            }
            
            );
            if(response.data && response.data.success){
                openAlert("Testimonio creado", "El testimonio se ha editado con éxito", "success", "/admin");
            }else{
                openAlert("Testimonio fallido", "El testimonio no se pudo editar por un error con la sesión", "error", null);
            }
        }catch(error){
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
        }
    }
    
    return(
        <main>
        <form className="testimonial" onSubmit={handleSubmit}>
            <h2 className='titleSection'>Editar testimonio: </h2>
            <label htmlFor="profileFoto" style={{textAlign:'center'}}>Ingresa una foto:</label>
            <div className="testimonial-foto" style={!image ? {
                        border: '2px solid black'
                    } : {}}>
                <label htmlFor="profileFoto" className="label-photo">
                    <img src={image ? image : endpointLocal+"img/img_defecto.webp"} alt="Preview Face of testimonial creator" />
                    <div className="hover-testimonial">
                        <img src={`${endpointLocal}img/change_photo.webp`} alt="Change foto icon " />
                    </div>
                </label>
                <input type="file" accept="image/*" onChange={handleImageUpload} id="profileFoto" className="file"/>
            </div>
            <div className="testimonial-left">
                <textarea className="testimonial-content" rows="4" value={content}placeholder='Ingresa el testimonio' required onChange={(event) => {setContent(event.target.value)}}></textarea>
                <input type="text"className="testimonial-name" value={name} placeholder='Ingresa del creador del testimonio' required onChange={(event) => {setName(event.target.value)}}/>
                <input className="testimonial-relation" value={relation} placeholder='Ingresa la relación con la persona del testimonio' required onChange={(event) => {setRelation(event.target.value)}}/>
                <label htmlFor="date" style={{marginBottom: '0.3rem', textAlign:'center'}}>Ingresa la fecha de creación del testimonio</label>
                <input className="testimonial-date" value={date} name="date" type = "date"  placeholder='Ingresa la fecha en la que se hizo este testimonio' required onChange={(event) => {setDate(event.target.value)}} style={{marginBottom: '1rem', border:'1px solid black'}}/>
            </div> 
            <button type="submit" className="accept">Editar testimonio</button>
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
        </main>
    );
}
export default EditTestimonial;