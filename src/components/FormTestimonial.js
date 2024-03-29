import './css/testimonial.css';
import {useState} from 'react';
import Alert from './Alert';
import config from './config.json';
import Cookies from 'js-cookie';
import axios from 'axios';
function FormTestimonial(){
    const [name, setName] = useState('');
    const [relation, setRelation] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);

    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
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
            openAlert("Creando...", `Espere mientras se cargan los datos necesarios para cargar la publicación`, "loading", null, false, null);
            const cookie = Cookies.get('session');
            event.preventDefault();
            const formData = new FormData();
            formData.append('name', name);
            formData.append('relation', relation);
            formData.append('testimonial', content);
            formData.append('image', imageFile);
            formData.append('date', date);
            formData.append('cookie', cookie);
            
            const response = await axios.post(`${endpoint}/testimonial`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data', // Configura el encabezado para enviar datos multipart/form-data
                }
            }
            
            );
            if(response.data && response.data.success){
                openAlert("Testimonio creado", "El testimonio se ha creado con éxito", "success", null);
            }else{
                openAlert("Testimonio fallido", "El testimonio no se pudo crear por un error con la sesión", "error", null);
            }
        }catch(error){
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
        }
        
    }
    return (
        <>
        <form className="testimonial" onSubmit={handleSubmit}>
            <h2 className='titleSection'>Crear nuevo testimonio: </h2>
            <label htmlFor="profileFoto" style={{textAlign:'center'}}>Ingresa una foto:</label>
            <div className="testimonial-foto" style={!image ? {
                        border: '2px solid black'
                    } : {}}>
                <label htmlFor="profileFoto" className="label-photo">
                    <img src={image ? image : `${endpointLocal}img/img_defecto.webp`} alt="Preview Face of testimonial creator" 
                        data-tooltip-id='tooltip'
                        data-tooltip-content='Cambiar foto'
                        data-tooltip-place='top'
                    />
                    <div className="hover-testimonial">
                        <img src={`${endpointLocal}img/change_photo.webp`} alt="Change foto icon " />
                    </div>
                </label>
                <input type="file" accept="image/*" onChange={handleImageUpload} id="profileFoto" className="file" required/>
            </div>
            <div className="testimonial-left">
                <textarea className="testimonial-content" rows="4" placeholder='Ingresa el testimonio' required onChange={(event) => {setContent(event.target.value)}}></textarea>
                <input type="text"className="testimonial-name" placeholder='Ingresa del creador del testimonio' required onChange={(event) => {setName(event.target.value)}}/>
                <input className="testimonial-relation"placeholder='Ingresa la relación con la persona del testimonio' required onChange={(event) => {setRelation(event.target.value)}}/>
                <label htmlFor="date" style={{marginBottom: '0.3rem', textAlign:'center'}}>Ingresa la fecha de creación del testimonio</label>
                <input className="testimonial-date" name="date" type = "date"  placeholder='Ingresa la fecha en la que se hizo este testimonio' required onChange={(event) => {setDate(event.target.value)}} style={{marginBottom: '1rem', border:'1px solid black'}}/>
            </div> 
            <button type="submit" className="accept">Crear testimonio</button>
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

export default FormTestimonial;