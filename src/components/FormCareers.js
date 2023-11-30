import './css/formCareers.css';
import {useState} from 'react';
import Alert from './Alert';
import axios from 'axios';
import config from './config.json';
import Cookies from 'js-cookie';
function FormCareers() {
    const [name, setName] = useState('');
    const [admissionProfile, setAdmissionProfile] = useState('');
    const [graduationProfile, setGraduationProfile] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const endpoint = config.endpoint;
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
            openAlert("Creando...", `Espere mientras se cargan los datos necesarios para crear la carrera`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/career`, {
                name: name,
                admissionProfile: admissionProfile,
                graduationProfile: graduationProfile,
                cookie: Cookies.get('session')
            });
        if(response.data.success){
            openAlert("Carrera creada", "La carrera se ha creado con éxito", "success", null);
        }else{
            openAlert("Error al crear la carrera", "La carrera no se ha podido crear debido a un error inesperado", "error", null);
        }}catch(error){
            openAlert("Error al crear la carrera", `La carrera no se ha podido crear debido a un error inesperado: ${error}`, "error", null);
        }
    }
    return (<>
        <form action="" onSubmit={handleSubmit} className='form-career'>
            <h2 className='titleSection'>Crear carrera</h2>
            <div className="form-group">
                <label htmlFor="name">Nombre de la carrera:</label>
                <input type="text" name="name-career" id="name-career" value={name} onChange={(event)=>(setName(event.target.value))} placeholder="Ingresa el nombre de la carrera" required />
            </div>
            <div className="form-group">
                <label htmlFor="in-profile">Perfil de ingreso: </label>
                <textarea name="in-profile" id="in-profile" cols="30" rows="10" value = {admissionProfile} placeholder="Ingresa el perfil de ingreso de la carrera" onChange={(event) => (setAdmissionProfile(event.target.value))} required></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="out-profile">Perfil de egreso:</label>
                <textarea name="out-profile" id="out-profile" cols="30" rows="10" value = {graduationProfile} placeholder="Ingresa el perfil de egreso de la carrera" onChange={(event) => (setGraduationProfile(event.target.value))} required></textarea>
            </div>
            <button type="submit" className="accept">Crear carrera</button>
        </form>
        <Alert 
        isOpen={alertOpen} 
        closeAlert={closeAlert} 
        title={alert ? alert.title : ''} 
        message={alert ? alert.message : ''} 
        kind = {alert ? alert.kind : ''} 
        redirectRoute={alert ? alert.redirectRoute : ''}/>
    </>)}

export default FormCareers;