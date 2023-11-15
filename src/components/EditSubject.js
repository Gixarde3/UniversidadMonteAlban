import './css/formCareers.css';
import {useState, useEffect} from 'react';
import Alert from './Alert';
import axios from 'axios';
import config from './config.json';
import Cookies from 'js-cookie';
import SelectCareer from './SelectCareer';
import { useLocation } from "react-router-dom";
function EditSubject() {
    const [subjectState, setSubjectState] = useState(null);
    const [name, setName] = useState('');
    const [idCareer, setIdCareer] = useState(null)
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [cycle, setCycle] = useState(1);
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const location = useLocation();
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const subject = location.state.subject;

    useEffect(() => {
        const getSubject = async(id)  =>{
            const response = await axios.get(`${endpoint}/subject/${id}`);
            setSubjectState(response.data);
        }
        if(subject){
            getSubject(subject);
        }
    }, [subject, endpoint]);

    useEffect(()=>{
        if(subjectState){
            setName(subjectState.name);
            setIdCareer(subjectState.idCareer);
            setCycle(subjectState.semester);
        }
    },[subjectState]);

    useEffect(()=>{
        const setCareer = async (idCareer) => {
            openAlert("Cargando...", `Cargando carrera`, "loading", null, false, null)
            const response = await axios.get(`${endpoint}/career/${idCareer}`);
            setSelectedCareer(response.data);
            closeAlert();
        }
        if(idCareer){
            setCareer(idCareer);
        }
    },[idCareer, endpoint]);


    const setCareer = async (idCareer) => {
        setIdCareer(idCareer);
        openAlert("Cargando...", `Cargando carrera`, "loading", null, false, null)
        const response = await axios.get(`${endpoint}/career/${idCareer}`);
        setSelectedCareer(response.data);
        closeAlert();
    }
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };
    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
        setAlertOpen(true);
    };

    
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            openAlert("Editando..", `Espere mientras se cargan los datos necesarios para editar la materia`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/subject/edit/${subjectState.id}`, {
                name: name,
                idCareer: idCareer,
                semester:cycle,
                cookie: Cookies.get('session')
            });
        if(response.data.success){
            console.log(response.data);
            openAlert("Materia editada", "La materia se ha editado con éxito", "success", "/admin/careers" + idCareer);
        }else{
            openAlert("Error al editar la materia", "La materia no se ha podido editar debido a un error inesperado", "error", null);
        }}catch(error){
            openAlert("Error al editar la materia", `La materia no se ha podido editar debido a un error inesperado: ${error}`, "error", null);
            console.log(error);
        }
    }
    const quitCareer = () => {
        setIdCareer(null);
        setSelectedCareer(null);
    }
    return (<>
    <section className="section-admin">
        <form action="" className='form-career' onSubmit={handleSubmit}>
            <h2 className='titleSection'>Editar materia</h2>
            <div className="form-group">
                <label htmlFor="name-subject">Nombre de la materia:</label>
                <input type="text" name="name-subject" id="name-career" value={name} onChange={(event)=>(setName(event.target.value))} placeholder="Ingresa el nombre de la materia" required />
            </div>
            <div className="form-group">
                <label htmlFor="cycle">Cautrimestre al que pertenece:</label>
                <select name="cycle" id="cycle" value={cycle} onChange={(event) => (setCycle(event.target.value))} style={{width:'100%'}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
            {
                selectedCareer ? (
                    <>
                    <h4 style={{marginBottom:'0.5rem'}}>Carrera a la que pertenecerá</h4>
                    <div className="res" style={{width: '100%'}}>
                        <div className="buttons">
                            <button type="button" className="btn-admin eliminar" onClick={() => {quitCareer()}}>
                                <img src={`${endpointLocal}img/close.png`} alt="Icono eliminar" />
                            </button>
                        </div>
                        <div className="selectedCareer result" style={{width: '100%'}}>
                            <p>{selectedCareer.id}</p>
                            <p className="post-title">{selectedCareer.name}</p>
                            <p className="post-description">{selectedCareer.graduationProfile}</p>
                            <p className="post-file">{selectedCareer.admissionProfile}</p>
                        </div>
                    </div>
                </>
                ):(
                    null
                )
            }
            <SelectCareer selectCareer={setCareer}/>
            {selectedCareer ? (<button className='accept' type="submit">Editar materia</button>) : (null)}
        </form>
        <Alert 
        isOpen={alertOpen} 
        closeAlert={closeAlert} 
        title={alert ? alert.title : ''} 
        message={alert ? alert.message : ''} 
        kind = {alert ? alert.kind : ''} 
        redirectRoute={alert ? alert.redirectRoute : ''}/>
        </section>
    </>)
}

export default EditSubject;