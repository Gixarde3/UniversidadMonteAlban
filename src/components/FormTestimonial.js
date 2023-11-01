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
    const [image, setImage] = useState(null);
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
        try{
            const selectedImage = e.target.files[0];
            setImage(URL.createObjectURL(selectedImage));
        }catch(error){
            console.log(error);
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
            formData.append('image', image);
            formData.append('cookie', cookie);
            const response = axios.post(`${endpoint}/testimonial`, formData);
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
                    <img src={image ? image : "img/img_defecto.webp"} alt="Preview Face of testimonial creator" />
                    <div className="hover-testimonial">
                        <img src="img/change_photo.webp" alt="Change foto icon " />
                    </div>
                </label>
                <input type="file" accept="image/*" onChange={handleImageUpload} id="profileFoto" className="file" required/>
            </div>
            <div className="testimonial-left">
                <textarea className="testimonial-content" rows="4" placeholder='Ingresa el testimonio' required onChange={(event) => {setContent(event.target.value)}}></textarea>
                <input type="text"className="testimonial-name" placeholder='Ingresa del creador del testimonio' required onChange={(event) => {setName(event.target.value)}}/>
                <input className="testimonial-relation"placeholder='Ingresa la relación con la persona del testimonio' required onChange={(event) => {setRelation(event.target.value)}}/>
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