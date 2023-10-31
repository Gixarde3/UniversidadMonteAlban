import {useState} from 'react';
import axios from 'axios';
import config from './config.json';
import Alert from './Alert';
import Cookies from 'js-cookie';
function SearhPublication(){
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [results, setResults] = useState([]);
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
            const response = await axios.get(`${endpoint}/search-publication`,
                {
                    title:title,
                    cookie: Cookies.get('session')
                }
            );
            setResults(response.data);
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }
    return(
        <>
            <search id="search">
                <h3>Buscar una publicación</h3>
                <form id="row-search" onSubmit={handleSubmit}>
                    <img src="" alt="icono_buscar" />
                    <input type="text" name="title-search" id="title-search" placeholder="Ingresa el titulo de la publicación a buscar" onChange = {(event) => {setTitle(event.target.value)}} rquired/>
                    <button type="submit">Buscar</button>
                </form>
            </search>
            <div id="results">
                {
                    results.map((result, index) => (
                        <div className="result" key={index}>
                            <img src={result.img} alt={result.legend} />
                            <h4>{result.title}</h4>
                            <p>{result.description}</p>
                        </div>
                    ))
                }
            </div>
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

export default SearhPublication;