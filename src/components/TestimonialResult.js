import React, {useState} from 'react';
import config from './config.json';
import axios from 'axios';
import Alert from './Alert';
import Cookies from 'js-cookie';
function TestimonialResult({result}){
    const [isEditing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [relation, setRelation] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const endpoint = config.endpoint;
    const handleImageUpload = (e) => {
        try{
            const selectedImage = e.target.files[0];
            setImageFile(e.target.files[0]);
            setImage(URL.createObjectURL(selectedImage));
        }catch(error){
            console.log(error);
        }
    };
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };
    /*
    const handleSubmitEdit = async(event) => {
        event.preventDefault();
        openAlert("¿Seguro de editar?", `Los cambios no serán reversibles`, "question", null, true, editComent);  

    }*/
    const deletetestimonial = async(id_testimonial) => {
        const cookie = Cookies.get('session');
        console.log(id_testimonial);
        console.log(`${endpoint}/testimonial/delete/${id_testimonial}`);
        try {
            const response = await axios.post(`${endpoint}/testimonial/delete/${id_testimonial}`, {cookie:cookie});
            if(!response || !response.data || response.data.success === false){
                openAlert("Error inesperado", `El testimonio no se ha podido eliminar debido a un error inesperado`, "error", null, false);
            }else{
                openAlert("testimonio eliminado", "El testimonio se ha eliminado con éxito", "success", null, false);
                //reloadResults();
            }
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false);
        }
    } 

    const handleSubmitDelete = async(event, id_testimonial) => {
        event.preventDefault();
        await openAlert("¿Seguro de eliminar?", `El testimonio será eliminado definitavemente`, "question", null, true, () => deletetestimonial(id_testimonial));     
    }
    const endpointImage = config.endpointImage;
    return(
        <div className="res" style={{width: '100%'}}>
            <form className="buttons" onSubmit={(event) => handleSubmitDelete(event, result.id)}>
                <button type="button" className="btn-admin editar">
                    <img src="img/edit.png" alt="Icono editar" onClick={() => {setEditing(true)}}/>
                </button>
                <button type="submit" className="btn-admin eliminar">
                    <img src="img/close.png" alt="Icono eliminar" />
                </button>
            </form>
            <div className="content testimonial" style={{width: '100%'}}>
                <div className="testimonial-foto">
                {
                    isEditing ?  (
                        <>
                            <div className="testimonial-foto">
                            <label htmlFor={"profileFotoEditing"+result.id} className="label-photo">
                                <img src={image ? image : endpointImage + "testimonial/" + result.img} alt="Preview Face of testimonial creator" />
                                <div className="hover-testimonial">
                                    <img src="img/change_photo.webp" alt="Change foto icon " />
                                </div>
                            </label>
                            </div>
                            <input type="file" accept="image/*" onChange={handleImageUpload} id={"profileFotoEditing"+result.id} className="file" required/>
                        </>
                    ) : (<img src={endpointImage + "testimonial/" + result.img}alt="Face of testimonial creator" />)
                }
                </div>
                <div className="testimonial-left">
                    <p className="testimonial-content">{result.content}</p>
                    <p className="testimonial-name">
                        - {result.name}
                    </p>
                    <p className="testimonial-relation">
                        {result.relation}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default TestimonialResult;