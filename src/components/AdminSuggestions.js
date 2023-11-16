import axios from 'axios';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import Alert from './Alert';
import { Tooltip } from 'react-tooltip';
import config from './config.json';
function AdminSuggestions() {
    const [suggestions, setSuggestions] = useState([]);
    const [showChecked, setShowChecked] = useState(false);
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    }
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    }
    useEffect(() => {
        const getSuggestions = async () => {
            openAlert("Cargando...", `Cargando sugerencias`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/complaints`,{
                cookie: Cookies.get('session')
            });
            setSuggestions(response.data);
            closeAlert();
        }
        getSuggestions();
    },[endpoint]);

    const checkSuggestion = async (id, index) => {
        try{
            openAlert("Cargando...", `Marcando la sugerencia como vista`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/complaint/check/${id}`,{
                cookie: Cookies.get('session'),
            });
            if(response.data.success === true){
                suggestions[index].checked = 1;
                openAlert("Sugerencia vista", `La sugerencia se ha marcado como vista`, "success", null, false, null);
            }else{
                openAlert("Error inesperado", `La sugerencia no se ha podido marcar como vista`, "error", null, false, null);
            }
        }catch(error){
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false, null);
            console.log(error);
        }
    }

    const filteredSuggestions = showChecked ? suggestions.filter((suggestion) => suggestion.checked === 1) : suggestions.filter((suggestion) => suggestion.checked === 0);

    return ( 
    <section className="section-admin" id="manage-suggestions">
        <h2>Gestión de sugerencias</h2>
        <button onClick={() => setShowChecked(!showChecked)} className='accept' style={{marginBottom:'1rem'}}>
            {showChecked ? 'Ver sugerencias no vistas' : 'Ver sugerencias vistas'}
        </button>
        {filteredSuggestions.map((result, index) => (
            <div className="res" key={index} style={{width: '100%'}}>
                {result.checked === 0 ? <form className="buttons">
                    <button type="button" data-tooltip-id="tooltip"
                                        data-tooltip-content="Marcar como vista"
                                        data-tooltip-place="top" 
                            className="btn-admin editar" style={{padding:'0'}}
                            onClick={() => (checkSuggestion(result.id, index))}>
                        <img src={`${endpointLocal}img/ver.png`} alt="Icono editar" />
                    </button>
                </form>:null}
                <div className="result" style={{width: '100%'}}>
                    <p>{result.id}</p>
                    <p className="post-title">{result.name}</p>
                    <p className='post-title'>{result.email}</p>
                    <p style={{whiteSpace:'normal'}}>{result.content}</p>
                    
                </div>
            </div>
        ))}
        <Tooltip id="tooltip" />
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
    );
}

export default AdminSuggestions;
