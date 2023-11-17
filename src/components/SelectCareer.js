import './css/testimonial.css';
import config from './config.json';
import axios from 'axios';
import {useState} from 'react';
import Alert from './Alert';
import { Tooltip } from 'react-tooltip';
import './css/Search.css';
function SearchCareer({selectCareer}){
    const [alert, setAlert] = useState(null);
    const [search, setSearch] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [searched, setSearched]  = useState(false);
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const [careers, setCareers] = useState([]);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };
    const searchCareer = async () => {
        try{
            openAlert("Cargando...", `Cargando resultados de búsqueda`, "loading", null, false, null);
            let response = await axios.get(`${endpoint}/career/search/${search}`);
            if(response.data.success === false){
                response = await axios.get(`${endpoint}/careers`);
            }
            setCareers(response.data);
            setSearched(true);
            closeAlert();
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }
    return(
        <>
        <search className="search">
            <h3 style={{width:'100%', color:'black', textAlign:'center'}}>Seleccionar carrera para la materia</h3>
            <div className="row-search">
                <input type="text" name="title-select-search" className="title-search" placeholder={`Ingresa el titulo de la carrera`} onChange = {(event) => {setSearch(event.target.value)}}/>
                <button type="button" className="btn-buscar" onClick={() => (searchCareer())}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Buscar carrera"
                    data-tooltip-place="top"
                ><img src={`${endpointLocal}img/search.png`} alt="icono_buscar" className="icono-buscar"/></button>
            </div>
        </search>
        <div className="results">
            {searched && careers.length === 0 ? (<h3 style={{color: 'black'}}>No hay resultados para esa búsqueda</h3>):''}
            {careers.map((result, index) => (
                <div className="res" key={index} style={{width: '100%'}}>
                    <form className="buttons">
                        <button type="button" className="btn-admin seleccionar" onClick={()=>{selectCareer(result.id)}}
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Seleccionar carrera"
                            data-tooltip-place="top"
                        >
                            <img src={`${endpointLocal}img/select.png`} alt="Icono seleccionar" />
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
        <Tooltip id="tooltip"/>
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