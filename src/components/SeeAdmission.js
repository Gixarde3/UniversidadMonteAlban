import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import config from './config.json';
import Alert from './Alert';
import axios from 'axios';
function SeeAdmission() {
    const {url} = useParams();
    const [admissionObject, setAdmissionObject] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState(null);
    const [admission, setAdmission] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [carreras, setCarreras] = useState([]);
    const [idCarrera, setIdCarrera] = useState(0);
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
        const getAdmission = async () => {
            try{
                openAlert("Admisión", "Cargando mensaje de admisión", "loading", null, false, null);
                const response = await axios.get(`${endpoint}/admission/${url}`);
                setAdmissionObject(response.data);
                const careersResponse = await axios.get(`${endpoint}/careers`);
                setCarreras(careersResponse.data);
            }catch(error){
                openAlert("Error al cargar el mensaje de admisión", `El mensaje de admisión no existe`, "error", "/");
            }
        }
        getAdmission();
    }, [url, endpoint]);

    useEffect(() => {
        if (admissionObject && admissionObject.name) {
            setName(admissionObject.name);
            setEmail(admissionObject.email);
            setAdmission(admissionObject.content);
            if(admissionObject.response){
                setResponse(admissionObject.response)
            }
            setIdCarrera(admissionObject.idCareer);
            closeAlert();
        }
    }, [admissionObject]);

    const editAdmission = async () => {
        try{
            openAlert("Editando...", `Espere mientras se edita el mensaje de admisión`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/admission/edit/${url}`, {
                name: name,
                email: email,
                content: admission,
                idCareer: idCarrera
            });
            if(response.data.success){
                openAlert("Sugerencia editada", "El mensaje de admisión se ha editado con éxito", "success", null);
            }else{
                openAlert("Error al editar el mensaje de admisión", "El mensaje de admisión no se ha podido editar debido a un error inesperado", "error", null);
            }
        }catch(error){
            openAlert("Error al editar el mensaje de admisión", `El mensaje de admisión no se ha podido editar debido a un error inesperado: ${error}`, "error", null);
        }
    };
    const deleteAdmission = async () => {
        try{
            openAlert("Eliminando...", `Espere mientras se elimina el mensaje de admisión`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/admission/delete/${url}`);
            if(response.data.success){
                openAlert("Sugerencia eliminada", "El mensaje de admisión se ha eliminado con éxito", "success", "/");
            }else{
                openAlert("Error al eliminar el mensaje de admisión", "El mensaje de admisión no se ha podido eliminar debido a un error inesperado", "error", null);
            }
        }catch(error){
            openAlert("Error al eliminar el mensaje de admisión", `El mensaje de admisión no se ha podido eliminar debido a un error inesperado: ${error}`, "error", null);
        }
    };
    const deleteAdmissionAsk = () => {
        openAlert("¿Seguro?", `¿Desea eliminar el mensaje de admisión?`, "question", null, true, deleteAdmission);
    }
    return (
        <main>
            <section className='section-admin'>
                <form className="form-admin" style={{position:'relative', padding:'1rem'}}>
                    <h1>Admisión</h1>
                    <div className="buttons">
                        <button type="button" className="btn-admin eliminar" onClick={() => (deleteAdmissionAsk())}
                            data-tooltip-id='tooltip'
                            data-tooltip-content='Eliminar mensaje de admisión'
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
                        <label htmlFor="admission">Mensaje: </label>
                        <textarea name="admission" id="admission" value={admission} onChange={(event) => (setAdmission(event.target.value))} required/>
                    </div>
                    <select name="carrera" id="carrera" onChange={(event)=>{setIdCarrera(event.target.value)}} defaultValue={idCarrera}>
                        {carreras.map((carrera, index) => (
                            <option value={carrera.id} key={index}>{carrera.name}</option>
                        ))}
                    </select>
                    <button type="button" className='accept' onClick={() => {editAdmission()}}>Editar mensaje de admisión</button>
                </form>
                {
                    response ? 
                        <div className="res" style={{width: '100%', marginTop:'1rem'}}>
                            <div className="result" style={{width: '100%'}}>
                                <p className='post-title'>Respuesta de uno de nuestros reclutadores</p>
                                <p style={{whiteSpace:'normal'}}>{response}</p>
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

export default SeeAdmission;