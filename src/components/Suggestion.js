import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import config from './config.json';
import Alert from './Alert';
import axios from 'axios';
function Suggestion() {
    const {url} = useParams();
    const [suggestionObject, setSuggestionObject] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [checked, setChecked] = useState(0);
    const [suggestion, setSuggestion] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    }
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    }

    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    useEffect(() => {
        const getSuggestion = async () => {
            try{
                openAlert("Sugerencia", "Cargando sugerencia", "loading", null, false, null);
                const response = await axios.get(`${endpoint}/complaint/${url}`);
                setSuggestionObject(response.data);
            }catch(error){
                openAlert("Error al cargar la sugerencia", `La sugerencia no existe`, "error", "/");
            }
        }
        getSuggestion();
    }, [url, endpoint]);

    useEffect(() => {
        if (suggestionObject && suggestionObject.name) {
            setName(suggestionObject.name);
            setEmail(suggestionObject.email);
            setSuggestion(suggestionObject.content);
            setChecked(suggestionObject.checked);
            closeAlert();
        }
    }, [suggestionObject]);

    const editSuggestion = async () => {
        try{
            openAlert("Editando...", `Espere mientras se edita la sugerencia`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/complaint/edit/${url}`, {
                name: name,
                email: email,
                content: suggestion
            });
            if(response.data.success){
                openAlert("Sugerencia editada", "La sugerencia se ha editado con éxito", "success", null);
            }else{
                openAlert("Error al editar la sugerencia", "La sugerencia no se ha podido editar debido a un error inesperado", "error", null);
            }
        }catch(error){
            openAlert("Error al editar la sugerencia", `La sugerencia no se ha podido editar debido a un error inesperado: ${error}`, "error", null);
            console.log(error);
        }
    };
    const deleteSuggestion = async () => {
        try{
            openAlert("Eliminando...", `Espere mientras se elimina la sugerencia`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/complaint/delete/${url}`);
            if(response.data.success){
                openAlert("Sugerencia eliminada", "La sugerencia se ha eliminado con éxito", "success", "/");
            }else{
                openAlert("Error al eliminar la sugerencia", "La sugerencia no se ha podido eliminar debido a un error inesperado", "error", null);
            }
        }catch(error){
            openAlert("Error al eliminar la sugerencia", `La sugerencia no se ha podido eliminar debido a un error inesperado: ${error}`, "error", null);
            console.log(error);
        }
    };
    const deleteSuggestionAsk = () => {
        openAlert("¿Seguro?", `¿Desea eliminar la sugerencia?`, "question", null, true, deleteSuggestion);
    }
    return (
        <main>
            <section className='section-admin'>
                <form className="form-admin" style={{position:'relative', padding:'1rem'}}>
                    <h1>Sugerencia</h1>
                    <div className="buttons">
                        <button type="button" className="btn-admin eliminar" onClick={() => (deleteSuggestionAsk())}
                            data-tooltip-id='tooltip'
                            data-tooltip-content='Eliminar sugerencia'
                            data-tooltip-place='top'
                        >
                            <img src={`${endpointLocal}img/close.png`} alt="Icono eliminar" style={{marginBottom:'0'}}/>
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nombre: </label>
                        <input type="text" name="name" id="name" value={name} onChange={(event) => (setName(event.target.value))} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(event) => (setEmail(event.target.value))} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="suggestion">Sugerencia</label>
                        <textarea name="suggestion" id="suggestion" value={suggestion} onChange={(event) => (setSuggestion(event.target.value))} required/>
                    </div>
                    <button type="button" className='accept' onClick={() => {editSuggestion()}}>Editar sugerencia</button>
                </form>
                {
                    checked === 1 ? 
                        <div className="res" style={{width: '100%', marginTop:'1rem'}}>
                            <div className="result" style={{width: '100%'}}>
                                <p className='post-title'>Sugerencia revisada</p>
                                <p>¡Hemos revisado tu sugerencia!</p>
                                <p>Tu sugerencia ha sido leída por un administrador y será tomada en cuenta.</p>
                                <p>Tus sugerencias ayudan a mejorar nuestra institución, ¡muchas gracias!</p>
                            </div>
                        </div> 
                    : 
                        null
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
            </section>
        </main>
    );
}

export default Suggestion;