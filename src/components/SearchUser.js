import './css/testimonial.css';
import config from './config.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useState} from 'react';
import Alert from './Alert';
import RoleCombo from './RoleCombo';
import './css/Search.css';
function SearchUser(){
    const [alert, setAlert] = useState(null);
    const [search, setSearch] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [searched, setSearched]  = useState(false);
    const endpoint = config.endpoint;
    const [users, setUsers] = useState([]);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    const deleteUser= async(id_user) => {
        const cookie = Cookies.get('session');
        try {
            openAlert("Eliminando", `Eliminando usuario`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/user/delete/${id_user}`, {cookie:cookie});
            if(!response || !response.data || response.data.success === false){
                openAlert("Error inesperado", `El usuario no se ha podido eliminar debido a un error inesperado`, "error", null, false);
            }else{
                const updatedUsers = users.filter((user) => user.id !== id_user);
                setUsers(updatedUsers); // Elimina el testimonio de la lista
                openAlert("Usuario eliminado", "El usuario se ha eliminado con éxito", "success", null, false);
                getResults();
            }
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false);
        }
    } 

    const getResults= async() => {
        try{
            openAlert("Buscando...", `Buscando usuario`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/users/`,{
                search: search,
                cookie: Cookies.get('session')
            });
            closeAlert();
            console.log(response);
            if(response.data.success){
                setUsers(response.data.users);
                setSearched(true);
            }else{
                openAlert('Error inesperado con la petición', `Error con tus permisos, no puedes buscar usuarios ${response.data}`, 'error', null)
                console.log(response);
            }
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
            console.log(error);
        }
    }

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        try{
            openAlert("Buscando...", `Buscando usuario`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/users/`,{
                search: search,
                cookie: Cookies.get('session')
            });
            closeAlert();
            console.log(response);
            if(response.data.success){
                setUsers(response.data.users);
                setSearched(true);
            }else{
                openAlert('Error inesperado con la petición', `Error con tus permisos, no puedes buscar usuarios ${response.data}`, 'error', null)
                console.log(response);
            }
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
            console.log(error);
        }
    }

    const handleSubmitDelete = async(event, id_user) => {
        event.preventDefault();
        await openAlert("¿Seguro de eliminar?", `Todo lo relacionado a ese usuario será eliminado también`, "question", null, true, () => deleteUser(id_user));     
    }
    return(
        <>
        <search className="search">
            <h3 style={{width:'100%', color:'black', textAlign:'center'}}>Buscar usuario</h3>
            <form className="row-search" onSubmit={handleSubmitSearch}>
                <input type="text" name="title-search" className="title-search" placeholder={`Ingresa el username a buscar`} onChange = {(event) => {setSearch(event.target.value)}}/>
                <button type="submit" className="btn-buscar"><img src="img/search.png" alt="icono_buscar" className="icono-buscar"/></button>
            </form>
        </search>
        <div className="results">
            {searched && users.length === 0 ? (<h3 style={{color: 'black'}}>No hay resultados para esa búsqueda</h3>):''}
            {users.map((result, index) => (
                result.id === 99999 ? '' : (
                <div className="res" key={index} style={{width: '100%'}}>
                    <form className="buttons" onSubmit={(event) => handleSubmitDelete(event, result.id)}>
                        <button type="submit" className="btn-admin eliminar">
                            <img src="img/close.png" alt="Icono eliminar" />
                        </button>
                    </form>
                    <div className="result" style={{width: '100%'}}>
                        <p className="user-id">Id: {result.id}</p>
                        <p className="user-name">Username: {result.username}</p>
                        <p className="name">Nombre: {result.name + " " + result.lastName}</p>
                        <p className="email">Email: {result.email}</p>
                        <p className="birthday">Fecha de nacimiento: {result.birthDay}</p>
                        <RoleCombo defaultRole={result.role} idUser={result.id}/>
                    </div>
                </div>
            )))}
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
export default SearchUser;