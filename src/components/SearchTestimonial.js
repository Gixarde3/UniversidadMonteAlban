import './css/testimonial.css';
import config from './config.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useState} from 'react';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import './css/Search.css';
function SearchTestimonial(){
    const [alert, setAlert] = useState(null);
    const [search, setSearch] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [searched, setSearched]  = useState(false);
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const navigate = useNavigate();
    const [testimonials, setTestimonials ] = useState([]);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    const deletetestimonial = async(id_testimonial) => {
        const cookie = Cookies.get('session');
        try {
            openAlert("Eliminando...", `Eliminando testimonio`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/testimonial/delete/${id_testimonial}`, {cookie:cookie});
            if(!response || !response.data || response.data.success === false){
                openAlert("Error inesperado", `El testimonio no se ha podido eliminar debido a un error inesperado`, "error", null, false);
            }else{
                const updatedTestimonials = testimonials.filter((testimonial) => testimonial.id !== id_testimonial);
                setTestimonials(updatedTestimonials); // Elimina el testimonio de la lista
                openAlert("testimonio eliminado", "El testimonio se ha eliminado con éxito", "success", null, false);
                getResults();
            }
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false);
        }
    } 

    const getResults= async() => {
        try{
            let response = '';
            openAlert("Buscando...", `Buscando testimonio`, "loading", null, false, null);
            if(!search || search === ''){
                response = await axios.get(`${endpoint}/testimonials`);
            }else{
                response = await axios.get(`${endpoint}/testimonials/${search}`);
            }
            setTestimonials(response.data);
            closeAlert();
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        try{
            let response = '';
            openAlert("Buscando...", `Buscando testimonio`, "loading", null, false, null);
            if(!search || search === ''){
                response = await axios.get(`${endpoint}/testimonials`);
            }else{
                response = await axios.get(`${endpoint}/testimonials/${search}`);
            }
            setTestimonials(response.data);
            setSearched(true);
            closeAlert();
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }

    const handleSubmitDelete = async(event, id_testimonial) => {
        event.preventDefault();
        await openAlert("¿Seguro de eliminar?", `El testimonio será eliminado definitavemente`, "question", null, true, () => deletetestimonial(id_testimonial));     
    }
    const endpointImage = config.endpointImage;
    return(
        <>
        <search className="search">
            <h2 style={{width:'100%', color:'black', textAlign:'center'}}>Buscar testimonios</h2>
            <form className="row-search" onSubmit={handleSubmitSearch}>
                <input type="text" name="title-search" className="title-search" placeholder={`Ingresa el nombre del testimonio`} onChange = {(event) => {setSearch(event.target.value)}}/>
                <button type="submit" className="btn-buscar"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Buscar testimonio"
                    data-tooltip-place="top"
                ><img src={`${endpointLocal}img/search.png`} alt="icono_buscar" className="icono-buscar"/></button>
            </form>
        </search>
        <div className="results">
            {searched && testimonials.length === 0 ? (<h3 style={{color: 'black'}}>No hay resultados para esa búsqueda</h3>):''}
            {testimonials.map((result, index) => (
                <div className="res" key={index} style={{width: '100%'}}>
                    <form className="buttons" onSubmit={(event) => handleSubmitDelete(event, result.id)}>
                        <button type="button" className="btn-admin editar" onClick={()=>{navigate(`editTestimonial/${result.id}`, {state: {testimonial: result}})}}
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Editar testimonio"
                            data-tooltip-place="top"
                        >
                            <img src={`${endpointLocal}img/edit.png`} alt="Icono editar" />
                        </button>
                        <button type="submit" className="btn-admin eliminar"
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Eliminar testimonio"
                            data-tooltip-place="top"
                        >
                            <img src={`${endpointLocal}img/close.png`} alt="Icono eliminar" />
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
                            <p className="testimonial-date">
                                {result.date}
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