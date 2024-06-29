import './css/subject.css'
import React from 'react';
import config from './config.json';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import axios from 'axios';
import Cookies from 'js-cookie';
function Subject({ cycle, subjects, editar, ids }) {
    const endpointLocal = config.endpointLocal;
    const endpoint = config.endpoint;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [subjectsState, setSubjectState] = useState(subjects);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };
    const deleteSubject = async (id_subject, index) => {
        try{
            const cookie = Cookies.get('session');
            openAlert("Eliminando...", `Eliminando materia`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/subject/delete/${id_subject}`, {cookie:cookie});
            if(!response || !response.data || response.data.success === false){
                openAlert("Error inesperado", `La materia no se ha podido eliminar debido a un error inesperado`, "error", null, false);
            }else{
                const updatedSubjects = subjectsState.filter((subject) => subject !== subjectsState[index]);
                setSubjectState(updatedSubjects); // Elimina el testimonio de la lista
                openAlert("Materia eliminada", "La materia se ha eliminado con éxito", "success", null, false);
            }
        }catch(error){
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false);
        }
    };
    const handleDeleteSubject = (idSubject, index) => {
        openAlert("Eliminar materia", "¿Estás seguro de que quieres eliminar esta materia?", "question", null, true, () => deleteSubject(idSubject, index));
    };
    return (<div className="subject">
        <button className={`subject-interaction accept ${open ? "open-button":""}`} onClick={() => setOpen(!open)}
            data-tooltip-id='tooltip'
            data-tooltip-content='Ver oferta de este cuatrimestre'
            data-tooltip-place='top'
        >
            <h3>{cycle === "99" ? "Optativas" : `Cuatrimestre ${cycle}`}</h3>
            <img src={`${endpointLocal}img/close.png`} alt="boton-abrir" />
        </button>
        <div className={`subject-list ${open ? "open":""}`}>
            <ul>
                {
                    subjectsState.map((subject, index) => (
                        <li key={index} style={editar ? {display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.2rem'} : {}}>
                            <h4>{subject}</h4>
                            {editar ? 
                            <div style={{display:'flex', flexDirection:'row' }}>
                                <button type="button" className="btn-admin editar" onClick={()=>{navigate(`/admin/careers/editSubject/${ids[index]}`, {state: {subject: ids[index]}})}}
                                    data-tooltip-id='tooltip'
                                    data-tooltip-content='Editar materia'
                                    data-tooltip-place='top'
                                >
                                    <img src={`${endpointLocal}img/edit.png`} alt="Icono editar" />
                                </button>
                                <button type="button" className="btn-admin eliminar" onClick={() => (handleDeleteSubject(ids[index], index))}
                                    data-tooltip-id='tooltip'
                                    data-tooltip-content='Eliminar materia'
                                    data-tooltip-place='top'
                                >
                                    <img src={`${endpointLocal}img/close.png`} alt="Icono eliminar"/>
                                </button>
                            </div> : null
                            }
                        </li>
                    ))
                }
            </ul>
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
    </div>);
}

export default Subject;