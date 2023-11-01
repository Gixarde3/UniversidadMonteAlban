import './css/Comment.css';
import {useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Alert from './Alert';
import config from './config.json';
function Comment({id_coment, userName, coment, isCreator, reloadComents}) {
    const [isEditing, setEditing] = useState(false);
    const [newComent, setNewComent] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const endpoint = config.endpoint;
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    const handleSubmitEdit = async(event) => {
        event.preventDefault();
        openAlert("¿Seguro de editar?", `Los cambios no serán reversibles`, "question", null, true, editComent);  

    }

    const editComent = async() => {
        try {
            const cookie = Cookies.get('session');
            const response = await axios.post(`${endpoint}/coment/edit/${id_coment}`, {id_coment:id_coment, 
                coment: newComent, 
                cookie: cookie});
            openAlert("Error inesperado", `El comentario no se ha podido editar debido a un error inesperado`, "error", null, false);
            if(response && response.data && response.data.success === false){
                openAlert("Error inesperado", `El comentario no se ha podido editar debido a un error inesperado`, "error", null, false);
            }else{
                openAlert("Comentario editado", "El comentario se ha editado con éxito", "success", null, false);
                setEditing(false);
            }
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false);
        }
        reloadComents();
    }

    const deleteComent = async() => {
        const cookie = Cookies.get('session');
        try {
            const response = await axios.post(`${endpoint}/coment/delete/${id_coment}`, {cookie:cookie});
            if(response && response.data && response.data.success === false){
                openAlert("Error inesperado", `El comentario no se ha podido eliminar debido a un error inesperado`, "error", null, false);
            }else{
                openAlert("Comentario eliminado", "El comentario se ha eliminado con éxito", "success", null, false);
                
            }
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false);
        }
        reloadComents();
    } 

    const handleSubmitDelete = async(event) => {
        event.preventDefault();
        openAlert("¿Seguro de eliminar?", `El comentario será eliminado definitavemente`, "question", null, true, deleteComent);     
    }
    return (
            <div className="comment" style={{padding:0, marginBottom:'0.5rem'}}>
                <h4 className="username" style={{textAlign:'left'}}>{userName}</h4>
                {
                    isEditing ? (
                        <form className="comment-text" style={{padding:0}} onSubmit={handleSubmitEdit}>
                            <textarea defaultValue={coment} onChange={(event) => (setNewComent(event.target.value))} rows="4" style={{fontSize:'16px',  lineHeight: 1.57143}}></textarea>
                            <div className="interactions-line" style={{padding:0}} >
                                <button type="submit" style={{marginRight:'0.3rem', color:'#2BA91E'}}>Editar</button>
                                <button type="button" onClick={() => setEditing(false)} style={{color:'#FE2A2A', fontWeight:'600'}}>Cancelar</button>
                            </div>
                        </form>
                    ) : (
                        <p className="comment-text">{coment}</p>
                    )
                }
                {
                    isEditing ? '' : (
                        <form className="interactions-line" style={{padding:0}} onSubmit={handleSubmitDelete}>
                            {isCreator ? <button type="button" onClick = {() => {setEditing(true)}} className='btn-coment'>Editar</button> : ''}
                            {isCreator ? <button type="submit" onClick = {()=>{}} style={{color:'#FE2A2A', fontWeight:'600'}} className='btn-coment'>Eliminar</button> : ''}
                        </form>
                    )
                }
                
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
            </div>
        );
}
 
export default Comment;