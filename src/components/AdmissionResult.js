import {useState} from 'react';
import axios from 'axios';
import Alert from './Alert';
import config from './config.json';
import Cookies from 'js-cookie';
function AdmissionResult({result}) {
    const [response, setResponse] = useState(result.response);
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const endpoint = config.endpoint;
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    }
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    }
    const getCareerName = async(id_career) => {
        try{
            const response = await axios.get(`${endpoint}/career/${id_career}`);
            return response.data.name;
        }catch(error){
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false, null);
        }
    }

    const answer = async() => {
        try{
            openAlert("Cargando...", `Enviando respuesta`, "loading", null, false, null);
            const responseAxios = await axios.post(`${endpoint}/admission/response/${result.id}`,{
                cookie: Cookies.get('session'),
                response: response
            });
            if(responseAxios.data.success === true){
                openAlert("Respuesta enviada", `La respuesta se ha enviado con éxito`, "success", null, false, null);
            }else{
                openAlert("Error inesperado", `La respuesta no se ha podido enviar`, "error", null, false, null);
            }
        }catch(error){
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false, null);
            console.log(error);
        }
    }
    return (
        <div className="res" style={{width: '100%'}}>
            <div className="result" style={{width: '100%'}}>
                <p>{result.id}</p>
                <p className="post-title">{result.name}</p>
                <p className='post-title'>{result.email}</p>
                <p style={{whiteSpace:'normal'}}>{result.content}</p>
                <p>Carrera de interés: {getCareerName(result.idCareer)}</p>
                <label htmlFor="response">Ingresa tu respuesta</label>
                <textarea name="response" id="response" cols="30" rows="4" value={response} onChange={(event) => (setResponse(event.target.value))}></textarea>
                <button type="button" className="accept" onClick={()=>(answer)}>Enviar respuesta</button>
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
        </div>
    );
}

export default AdmissionResult;