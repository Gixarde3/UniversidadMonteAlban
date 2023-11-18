import {useState, useEffect} from 'react';
import axios from 'axios';
import Alert from './Alert';
import config from './config.json';
import Cookies from 'js-cookie';
function AdmissionResult({idAdmission, name, email, content, idCareer, response, url}) {
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [careerName, setCareerName] = useState(null);
    const [newResponse, setNewResponse] = useState(response);
    const endpoint = config.endpoint;
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    }
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    }

    useEffect(() => {
        const getCareerName = async(id_career) => {
            try{
                const response = await axios.get(`${endpoint}/career/${id_career}`);
                setCareerName(response.data.name);
            }catch(error){
                openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false, null);
            }
        }
        getCareerName(idCareer);
    }, [idCareer, endpoint])

    const answer = async() => {
        try{
            openAlert("Cargando...", `Enviando respuesta`, "loading", null, false, null);
            const responseAxios = await axios.post(`${endpoint}/admission/response/${idAdmission}`,{
                cookie: Cookies.get('session'),
                response: newResponse
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
                <p>{idAdmission}</p>
                <p className="post-title">{name}</p>
                <p className='post-title'>{email}</p>
                <p style={{whiteSpace:'normal'}}>{content}</p>
                <p>Carrera de interés: {careerName}</p>
                <label htmlFor="response">Ingresa tu respuesta</label>
                <textarea name="response" id="response" cols="30" rows="4" value={newResponse} onChange={(event) => (setNewResponse(event.target.value))}></textarea>
                <button type="button" className="accept" onClick={()=>(answer())}>Enviar respuesta</button>
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