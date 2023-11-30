import './css/testimonial.css';
import config from './config.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useState} from 'react';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import './css/Search.css';
function SearchCareer(){
    const [alert, setAlert] = useState(null);
    const [search, setSearch] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [searched, setSearched]  = useState(false);
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const navigate = useNavigate();
    const [careers, setCareers] = useState([]);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    const deleteCareer= async(id_career) => {
        const cookie = Cookies.get('session');
        try {
            openAlert("Eliminando...", `Eliminando carrera`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/career/delete/${id_career}`, {cookie:cookie});
            if(!response || !response.data || response.data.success === false){
                openAlert("Error inesperado", `La carrera no se ha podido eliminar debido a un error inesperado`, "error", null, false);
            }else{
                const updatedCareers = careers.filter((post) => post.id !== id_career);
                setCareers(updatedCareers); // Elimina el testimonio de la lista
                openAlert("Publicación eliminada", "La carrera se ha eliminado con éxito", "success", null, false);
                getResults();
            }
        } catch (error) {
            console.log(error);
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false);
        }
    } 

    const getResults= async() => {
        try{
            openAlert("Cargando...", `Cargando resultados de búsqueda`, "loading", null, false, null);
            let response = await axios.get(`${endpoint}/career/search/${search}`);
            if(search === ''){
                response = await axios.get(`${endpoint}/careers`);
            }
            setCareers(response.data);
            closeAlert();
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        try{
            openAlert("Cargando...", `Cargando resultados de búsqueda`, "loading", null, false, null);
            let response = await axios.get(`${endpoint}/career/search/${search}`);
            if(search === ''){
                response = await axios.get(`${endpoint}/careers`);
            }
            setCareers(response.data);
            setSearched(true);
            closeAlert();
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }

    const handleSubmitDelete = async(event, id_career) => {
        event.preventDefault();
        await openAlert("¿Seguro de eliminar?", `La carrera será eliminada definitavemente`, "question", null, true, () => deleteCareer(id_career));     
    }
    return(
        <>
        <search className="search">
            <h2 style={{width:'100%', color:'black', textAlign:'center'}}>Buscar carreras</h2>
            <form className="row-search" onSubmit={handleSubmitSearch}>
                <input type="text" name="title-search" className="title-search" placeholder={`Ingresa el titulo de la carrera`} onChange = {(event) => {setSearch(event.target.value)}}/>
                <button type="submit" className="btn-buscar"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Buscar carrera"
                    data-tooltip-place="top"
                ><img src={`${endpointLocal}img/search.png`} alt="icono_buscar" className="icono-buscar"/></button>
            </form>
        </search>
        <div className="results">
            {searched && careers.length === 0 ? (<h3 style={{color: 'black'}}>No hay resultados para esa búsqueda</h3>):''}
            {careers.map((result, index) => (
                <div className="res" key={index} style={{width: '100%'}}>
                    <form className="buttons" onSubmit={(event) => handleSubmitDelete(event, result.id)}>
                        <button type="button" className="btn-admin editar" onClick={()=>{navigate(`/oferta/${result.id}`, {state: {career: result}})}} style={{padding:'0'}}
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Ver carrera"
                            data-tooltip-place="top"
                        >
                            <img src={`${endpointLocal}img/ver.png`} alt="Icono editar" />
                        </button>
                        <button type="button" className="btn-admin editar" onClick={()=>{navigate(`editCareer/${result.id}`, {state: {career: result}})}}
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Editar carrera"
                            data-tooltip-place="top"
                        >
                            <img src={`${endpointLocal}img/edit.png`} alt="Icono editar" />
                        </button>
                        <button type="submit" className="btn-admin eliminar"
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Eliminar carrera"
                            data-tooltip-place="top"
                        >
                            <img src={`${endpointLocal}img/close.png`} alt="Icono eliminar" />
                        </button>
                    </form>
                    <div className="result" style={{width: '100%'}}>
                        <p>{result.id}</p>
                        <p className="post-title">{result.name}</p>
                        <p className="post-description">{result.graduationProfile}</p>
                        <p className="post-file">{result.admissionProfile}</p>
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
export default SearchCareer;