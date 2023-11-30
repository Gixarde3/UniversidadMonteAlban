import './css/formCareers.css';
import {useState} from 'react';
import Alert from './Alert';
import axios from 'axios';
import config from './config.json';
import Cookies from 'js-cookie';
import SelectCareer from './SelectCareer';
function FormSubject() {
    const [name, setName] = useState('');
    const [idCareer, setIdCareer] = useState(null)
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [cycle, setCycle] = useState(1);
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };
    const openAlert = (title, message, kind, redirectRoute) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
        setAlertOpen(true);
    };

    const setCareer = async (idCareer) => {
        setIdCareer(idCareer);
        openAlert("Cargando...", `Cargando carrer`, "loading", null, false, null)
        const response = await axios.get(`${endpoint}/career/${idCareer}`);
        setSelectedCareer(response.data);
        closeAlert();
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            openAlert("Creando...", `Espere mientras se cargan los datos necesarios para crear la materia`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/subject`, {
                name: name,
                idCareer: idCareer,
                semester:cycle,
                cookie: Cookies.get('session')
            });
        if(response.data.success){
            openAlert("Materia creada", "La materia se ha creado con éxito", "success", null);
        }else{
            openAlert("Error al crear la materia", "La materia no se ha podido crear debido a un error inesperado", "error", null);
        }}catch(error){
            openAlert("Error al crear la materia", `La materia no se ha podido crear debido a un error inesperado: ${error}`, "error", null);
        }
    }
    const quitCareer = () => {
        setIdCareer(null);
        setSelectedCareer(null);
    }
    return (<>
        <form action="" className='form-career' onSubmit={handleSubmit}>
            <h2 className='titleSection'>Insertar nueva materia</h2>
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
                            <button type="button" className="btn-admin eliminar" onClick={() => {quitCareer()}}
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Quitar carrera'
                                data-tooltip-place='top'
                            >
                                <img src={`${endpointLocal}img/close.png`} alt="Icono eliminar"/>
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
            {selectedCareer ? (<button className='accept' type="submit">Insertar materia</button>) : (null)}
        </form>
        <Alert 
        isOpen={alertOpen} 
        closeAlert={closeAlert} 
        title={alert ? alert.title : ''} 
        message={alert ? alert.message : ''} 
        kind = {alert ? alert.kind : ''} 
        redirectRoute={alert ? alert.redirectRoute : ''}/>
    </>)}

export default FormSubject;