import './css/testimonial.css';
import config from './config.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useState} from 'react';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import './css/Search.css';
function SearchPublication(){
    const [alert, setAlert] = useState(null);
    const [search, setSearch] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [searched, setSearched]  = useState(false);
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    const deletePost= async(id_post) => {
        const cookie = Cookies.get('session');
        try {
            openAlert("Eliminando...", `Eliminando publicación`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/post/delete/${id_post}`, {cookie:cookie});
            if(!response || !response.data || response.data.success === false){
                openAlert("Error inesperado", `La publicación no se ha podido eliminar debido a un error inesperado`, "error", null, false);
            }else{
                const updatedPosts = posts.filter((post) => post.id !== id_post);
                setPosts(updatedPosts); // Elimina el testimonio de la lista
                openAlert("Publicación eliminada", "La publicación se ha eliminado con éxito", "success", null, false);
                getResults();
            }
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false);
        }
    } 

    const getResults= async() => {
        try{
            let response = null;
            openAlert("Cargando...", `Cargando resultados de búsqueda`, "loading", null, false, null);
            if(!search || search === ''){
                response = await axios.get(`${endpoint}/posts`);
            }else{
                response = await axios.get(`${endpoint}/posts/${search}`);
            }
            setPosts(response.data);
            closeAlert();
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }

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

    const handleSubmitDelete = async(event, id_testimonial) => {
        event.preventDefault();
        await openAlert("¿Seguro de eliminar?", `La publicación será eliminada definitavemente`, "question", null, true, () => deletePost(id_testimonial));     
    }
    const endpointImage = config.endpointImage;
    return(
        <>
        <search className="search">
            <h2 style={{width:'100%', color:'black', textAlign:'center'}}>Buscar publicaciones</h2>
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
                    <form className="buttons" onSubmit={(event) => handleSubmitDelete(event, result.id)}>
                        <button type="button" className="btn-admin editar" onClick={()=>{navigate(`editPost/${result.id}`, {state: {post: result}})}}
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Editar publicación"
                            data-tooltip-place="top"
                        >
                            <img src={`${endpointLocal}img/edit.png`} alt="Icono editar" />
                        </button>
                        <button type="submit" className="btn-admin eliminar"
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Eliminar publicación"
                            data-tooltip-place="top"
                        >
                            <img src={`${endpointLocal}img/close.png`} alt="Icono eliminar" />
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
export default SearchPublication;