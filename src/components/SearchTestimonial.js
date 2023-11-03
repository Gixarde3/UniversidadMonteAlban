import './css/testimonial.css';
import Search from "./Search";
import config from './config.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useState, useEffect} from 'react';
import Alert from './Alert';
function SearchTestimonial(){
    const [alert, setAlert] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [justOnce, setJustOnce] = useState(false);
    const endpoint = config.endpoint;
    const [testimonials, setTestimonials] = useState([]);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    /*
    const handleSubmitEdit = async(event) => {
        event.preventDefault();
        openAlert("¿Seguro de editar?", `Los cambios no serán reversibles`, "question", null, true, edittestimonial);  

    }
    */
    /*
    const edittestimonial = async() => {
        try {
            const cookie = Cookies.get('session');
            const response = await axios.post(`${endpoint}/testimonial/edit/${id_testimonial}`, {
                cookie: cookie});
            openAlert("Error inesperado", `El testimonio no se ha podido editar debido a un error inesperado`, "error", null, false);
            if(response && response.data && response.data.success === false){
                openAlert("Error inesperado", `El testimonio no se ha podido editar debido a un error inesperado`, "error", null, false);
            }else{
                openAlert("testimonio editado", "El testimonio se ha editado con éxito", "success", null, false);
                setEditing(false);
            }
        } catch (error) {
            console.log(error);
            openAlert("Error de conexión", `La petición ha fallado por ${error} ${error.response}`, "error", null, false);
        }
    }
    */



    const setTestimonialsOnce = (testimonials) => {
        if(!justOnce){
            setTestimonials(testimonials);
            setJustOnce(true);
        }
    }

    const deletetestimonial = async(id_testimonial) => {
        const cookie = Cookies.get('session');
        console.log(id_testimonial);
        console.log(`${endpoint}/testimonial/delete/${id_testimonial}`);
        try {
            const response = await axios.post(`${endpoint}/testimonial/delete/${id_testimonial}`, {cookie:cookie});
            if(!response || !response.data || response.data.success === false){
                openAlert("Error inesperado", `El testimonio no se ha podido eliminar debido a un error inesperado`, "error", null, false);
            }else{
                const updatedTestimonials = testimonials.filter((testimonial) => testimonial.id !== id_testimonial);
                setTestimonials(updatedTestimonials); // Elimina el testimonio de la lista
                openAlert("testimonio eliminado", "El testimonio se ha eliminado con éxito", "success", null, false);

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
        <>
        <Search aBuscar="testimonial" titleSearch="testimonio" renderResults={(results) =>(setTestimonialsOnce(results))}/>
        <div className="results">
            {testimonials.map((result, index) => (
                <div className="res" key={index} style={{width: '100%'}}>
                    <form className="buttons" onSubmit={(event) => handleSubmitDelete(event, result.id)}>
                        <button type="button" className="btn-admin editar">
                            <img src="img/edit.png" alt="Icono editar" />
                        </button>
                        <button type="submit" className="btn-admin eliminar">
                            <img src="img/close.png" alt="Icono eliminar" />
                        </button>
                    </form>
                    <div className="content testimonial" style={{width: '100%'}}>
                        <div className="testimonial-foto">
                            <img src={endpointImage + "testimonial/" +result.img}alt="Face of testimonial creator" />
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
            ))}
        </div>
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
        </>
    )
}
export default SearchTestimonial;