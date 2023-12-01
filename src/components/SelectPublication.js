import './css/testimonial.css';
import config from './config.json';
import axios from 'axios';
import {useState} from 'react';
import Alert from './Alert';
import './css/Search.css';
function SelectPublication({selectPublication}){
    const [alert, setAlert] = useState(null);
    const [search, setSearch] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [searched, setSearched]  = useState(false);
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const [posts, setPosts] = useState([]);
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
            let response = null;
            openAlert("Cargando...", `Cargando resultados de búsqueda`, "loading", null, false, null);
            if(!search || search === ''){
                response = await axios.get(`${endpoint}/posts`);
            }else{
                response = await axios.get(`${endpoint}/posts/${search}`);
            }
            setPosts(response.data);
            setSearched(true);
            closeAlert();
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }
    const endpointImage = config.endpointImage;
    return(
        <>
        <search className="search">
            <h3 style={{width:'100%', color:'black', textAlign:'center'}}>Busca una publicación a añadir</h3>
            <form className="row-search" onSubmit={handleSubmitSearch}>
                <input type="text" name="title-search" className="title-search" placeholder={`Ingresa el titulo de la publicación`} onChange = {(event) => {setSearch(event.target.value)}}/>
                <button type="submit" className="btn-buscar"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Buscar publicación"
                    data-tooltip-place="top"
                ><img src={`${endpointLocal}img/search.png`} alt="icono_buscar" className="icono-buscar"/></button>
            </form>
        </search>
        <div className="results">
            {searched && posts.length === 0 ? (<h3 style={{color: 'black'}}>No hay resultados para esa búsqueda</h3>):''}
            {posts.map((result, index) => (
                <div className="res" key={index} style={{width: '100%'}}>
                    <form className="buttons">
                        <button type="button" className="btn-admin seleccionar" onClick={()=>{selectPublication(result, result.id)}}
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Seleccionar publicación"
                            data-tooltip-place="top"
                        >
                            <img src={`${endpointLocal}img/select.png`} alt="Icono seleccionar" />
                        </button>
                    </form>
                    <div className="result" style={{width: '100%'}}>
                        <div className="post-image">
                            <img src={endpointImage + "post/" +result.img} alt={result.legend}/>
                        </div>
                        <p className="post-title">{result.title}</p>
                        <p className="post-description">{result.description}</p>
                        <p className="post-file">{result.route}</p>
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
export default SelectPublication;