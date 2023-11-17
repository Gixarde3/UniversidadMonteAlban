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
    return ( 
    <section className="section-admin" id="manage-admissions">
        <h2>Gestión de mensajes de admision</h2>
        {admissions.map((result, index) => (
            <AdmissionResult result={result} key={index}/>
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
