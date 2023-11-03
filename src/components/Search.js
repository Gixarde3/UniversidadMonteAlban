import {useState} from 'react';
import axios from 'axios';
import config from './config.json';
import Alert from './Alert';
import Cookies from 'js-cookie';
import './css/Search.css';
function Search({aBuscar, titleSearch, renderResults}){
    const [search, setSearch] = useState('');
    const [alert, setAlert] = useState(null);
    
    const [alertOpen, setAlertOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
        setAlertOpen(true);
    };
    const endpoint = config.endpoint;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.get(`${endpoint}/${aBuscar}s/?search=${search}`);
            setResults(response.data);
            setSearched(true);
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }

    const reloadResults = async() => {
        try{
            const response = await axios.get(`${endpoint}/${aBuscar}s/?search=${search}`);
            setResults(response.data);
            setSearched(true);
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }

    
    return(
        <>
            <search id="search">
                <h3 style={{width:'100%', color:'black', textAlign:'center'}}>Buscar {titleSearch}</h3>
                <form id="row-search" onSubmit={handleSubmit}>
                    <input type="text" name="title-search" id="title-search" placeholder={`Buscar ${titleSearch}`} onChange = {(event) => {setSearch(event.target.value)}}/>
                    <button type="submit" id="btn-buscar"><img src="img/search.png" alt="icono_buscar" id="icono-buscar"/></button>
                </form>
            </search>
            {((results.length === 0 && searched)?(<h3 style={{width:'100%', color:'black', textAlign:'center'}}>No hay resultados con esa búsqueda</h3>):'')} 
            {results.length > 0 && renderResults(results)}

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

export default Search;