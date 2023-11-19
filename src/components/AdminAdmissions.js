import axios from 'axios';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { Tooltip } from 'react-tooltip';
import config from './config.json';
import AdmissionResult from './AdmissionResult';
import Alert from './Alert';
function AdminAdmissions() {
    const [admissions, setAdmissions] = useState([]);
    const endpoint = config.endpoint;
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [admissionsAnswered, setAdmissionsAnswered] = useState([]);
    const [admissionsUnAnswered, setAdmissionsUnAnswered] = useState([]);
    const [admissionsToSee, setAdmissionsToSee] = useState([admissionsUnAnswered]);
    const [seeAnswered, setSeeAnswered] = useState(false);
    const [careerNames, setCareerNames] = useState([]);
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    }
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    }
    useEffect(() => {
        const getAdmissions = async () => {
            openAlert("Cargando...", `Cargando mensajes de admision`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/admissions`,{
                cookie: Cookies.get('session')
            });
            setAdmissions(response.data);
            closeAlert();
        }
        getAdmissions();
    },[endpoint]);

    useEffect(() => {
        const getCareerNames = async () => {
            const response = await axios.get(`${endpoint}/careers`);
            const careerNames = response.data.reduce((acc, career) => {
                acc[career.id] = career.name;
                return acc;
            }, {});
            setCareerNames(careerNames);
        }
        setAdmissionsAnswered(admissions.filter((admission) => admission.response !== null && admission.response !== ''));
        setAdmissionsUnAnswered(admissions.filter((admission) => admission.response === null || admission.response === ''));
        getCareerNames();
    }, [admissions, endpoint]);
    useEffect(() => {
        if(!seeAnswered){
            setAdmissionsToSee(admissionsUnAnswered);
        }else{
            setAdmissionsToSee(admissionsAnswered);
        }
        
    }, [seeAnswered, admissionsAnswered, admissionsUnAnswered]);
    const changeAdmissionsToSee = () => {
        setSeeAnswered(!seeAnswered);
    }
    
    const getAdmissions = async() => {
        try{
            openAlert("Cargando...", `Cargando mensajes de admision`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/admissions`,{
                cookie: Cookies.get('session')
            });
            setAdmissions(response.data);
            closeAlert();
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }
    return ( 
    <section className="section-admin" id="manage-admissions">
        <h2>Gestión de mensajes de admision</h2>
        <button className="accept" style={{marginBottom:'1rem'}} onClick={() => {changeAdmissionsToSee()}}>{!seeAnswered ? "Ver admisiones respondidas" : "Ver admisiones sin responder"}</button>
        {admissionsToSee.map((result, index) => (
            <AdmissionResult idAdmission={result.id} 
            name={result.name} 
            email={result.email} 
            career={careerNames[result.idCareer]} 
            content={result.content} 
            response={result.response ? result.response : ''} 
            key={index}
            reload={()=>(getAdmissions())}/>
        ))}
        <Tooltip id="tooltip" />
        <Alert 
            isOpen={alertOpen}
            closeAlert={closeAlert}
            title={alert ? alert.title : ''}
            message={alert ? alert.message : ''}
            kind={alert ? alert.kind : ''}
            redirectRoute={alert ? alert.redirectRoute : ''}
            asking={alert ? alert.asking : ''}
            onAccept={alert ? alert.onAccept : ''}
        />
    </section>
    );
}

export default AdminAdmissions;
