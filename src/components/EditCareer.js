import React from "react";
import axios from 'axios';
import config from './config.json';
import Cookies from 'js-cookie';
import {useState, useEffect} from 'react';
import Alert from './Alert';
import { useLocation } from "react-router-dom";
import Subject from "./Subject";
import './css/career.css';
function EditCareer(){
    const location = useLocation();
    const career = location.state ? location.state.career : null;
    const [idCareer, setIdCareer] = useState(-1);
    const [name, setName] = useState('');
    const [graduationProfile, setGraduationProfile] = useState('');
    const [admissionProfile, setAdmissionProfile] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [subjectsByCycle, setSubjectsByCycle] = useState([]);
    const [idSubjects, setIdSubjects] = useState([]);
    const [cycles, setCycles] = useState([]);
    const [careerSubjects, setCareerSubjects] = useState(null);
    const endpointImage = config.endpointImage;
    const endpoint = config.endpoint;
    useEffect(() => {
        const setCareerSubjectsF = async() => {
            const response = await axios.get(`${endpoint}/career/${career.id}}`);
            setCareerSubjects(response.data);
            console.log(response.data);
        }
        if(career){
            setCareerSubjectsF();
            setIdCareer(career.id);
            setName(career.name);
            setGraduationProfile(career.graduationProfile);
            setAdmissionProfile(career.admissionProfile);
        }
    }, [career, endpointImage, endpoint]);

    useEffect(() => {
        if(!careerSubjects){
            return;
        }
        const subByCycles = []; 
        const idByCycles = [];
        careerSubjects.subjects.map(
            (subject) => {
                if(!subByCycles[subject.cycle]){
                    subByCycles[subject.cycle] = [];
                    idByCycles[subject.cycle] = [];
                }
                subByCycles[subject.cycle].push(subject.name);
                idByCycles[subject.cycle].push(subject.id);
                return null;
            }
        );
        setSubjectsByCycle(subByCycles);
        setIdSubjects(idByCycles);
    }, [careerSubjects])
    useEffect(()=>{
        // Crear un array de objetos para renderizar en tu interfaz de usuario
        const cyclesArray = Object.keys(subjectsByCycle).map(cycle => ({
            cycle,
            subjects: subjectsByCycle[cycle],
            ids: idSubjects[cycle]
        }));
  
        // cyclesArray es un array que puedes utilizar en tu interfaz de usuario
        setCycles(cyclesArray);
        console.log(cyclesArray);
    }, [subjectsByCycle, idSubjects])

    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            openAlert("Creando...", `Espere mientras se cargan los datos necesarios para crear la carrera`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/career/edit/${idCareer}`, {
                name: name,
                admissionProfile: admissionProfile,
                graduationProfile: graduationProfile,
                cookie: Cookies.get('session')
            });
        if(response.data.success){
            openAlert("Carrera creada", "La carrera se ha creado con éxito", "success", "/admin");
        }else{
            openAlert("Error al crear la carrera", "La carrera no se ha podido crear debido a un error inesperado", "error", null);
        }}catch(error){
            openAlert("Error al crear la carrera", `La carrera no se ha podido crear debido a un error inesperado: ${error}`, "error", null);
        }
    }
    
    return(
        <>
        <section className="section-admin">
            <form action="" onSubmit={handleSubmit} className='form-career'>
                <h2 className='titleSection'>Editar carrera</h2>
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
                <button type="submit" className="accept">Editar carrera</button>
            </form>
            <h2>Editar materias</h2>
            <div id="cycles">
                {
                    cycles ? (cycles.map((cycle, index) => (
                         <Subject key={index} cycle={cycle.cycle} subjects={cycle.subjects} editar={true} ids={cycle.ids}/>
                    ))):(null)
                }
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
        </section>
        </>
    );
}
export default EditCareer;