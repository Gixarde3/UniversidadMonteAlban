import './css/testimonial.css';
import config from './config.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useState} from 'react';
import Alert from './Alert';
import Filter from './Filter';
import './css/Search.css';
function SearchBD(){
    const [alert, setAlert] = useState(null);
    const [search, setSearch] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [searched, setSearched]  = useState(false);
    const [filter, setFilter] = useState('none');
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const [databases, setDatabases] = useState([]);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        try{
            if(filter === 'none'){
                openAlert("Primero ingresa un filtro", `Para realizar una búsqueda es necesario primero ingresar un filtro`, "error", null, false, null);
                return;
            }
            openAlert("Cargando...", `Cargando resultados de búsqueda`, "loading", null, false, null);
            let response = await axios.post(`${endpoint}/database/search/${filter}/${search}`, {
                cookie: Cookies.get('session')
            });
            setDatabases(response.data);
            setSearched(true);
            closeAlert();
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }

    const filterSearch = {
        'none': 'Primero ingresa un filtro',
        'username': 'Ingresa el nombre de usuario',
        'date': 'Ingresa la fecha de modificación',
    }

    const changeFilter = (value) => {
        const filters = {
            '1': 'username',
            '2': 'date',
        }
        setFilter(filters[value]);
    }
    return(
        <>
        <search className="search">
            <h2 style={{width:'100%', color:'black', textAlign:'center'}}>Buscar modificaciones a la base de datos</h2>
            <form className="row-search" onSubmit={handleSubmitSearch}>
                <Filter setValue={(value) => (changeFilter(value))}/>
                <input type="text" name="title-search" className="title-search" placeholder={`${filterSearch[filter]}`} onChange = {(event) => {setSearch(event.target.value)}}/>
                <button type="submit" className="btn-buscar"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Buscar modificación a la base de datos"
                    data-tooltip-place="top"
                ><img src={`${endpointLocal}img/search.png`} alt="icono_buscar" className="icono-buscar"/></button>
            </form>
        </search>
        <div className="results">
            {searched && databases.length === 0 ? (<h3 style={{color: 'black'}}>No hay resultados para esa búsqueda</h3>):''}
            {databases.map((result, index) => (
                <div className="res" key={index} style={{width: '100%'}}>
                    <div className="result" style={{width: '100%'}}>
                        <p className="post-title">{result.username}</p>
                        <p className="post-description">{result.date}</p>
                        <p className="post-file">{result.modification}</p>
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
export default SearchBD;