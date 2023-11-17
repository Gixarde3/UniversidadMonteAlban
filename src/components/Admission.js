import './css/buzon.css';
import config from './config.json';
import axios from 'axios';
import Alert from './Alert';
import {useState, useEffect} from 'react';
function Admission() { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [carreras, setCarreras] = useState([]);
    const [idCarrera, setIdCarrera] = useState(0);
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
        const getCareers = async () => {
            try{
                const response = await fetch(`${endpoint}/careers`);
                const data = await response.json();
                setCarreras(data);
            }catch(error){
                console.log(error);
            }
        }
        getCareers();
    }, [endpoint]);
    const createMessage = async () => {
        try{
            openAlert("Creando...", `Espere mientras se crea la solicitud de admisión`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/admission`, {
                name: name,
                email: email,
                content: message,
                idCareer: idCarrera
            });
            if(response.data.success){
                openAlert("Sugerencia creada", "La solicitud de admisión se ha creado con éxito. Se te enviará un email con la liga para poder editar y eliminar tu solicitud de admisión.", "success", null);
            }else{
                openAlert("Error al crear la solicitud de admisión", "La solicitud de admisión no se ha podido crear debido a un error inesperado", "error", null);
            }
        }catch(error){
            openAlert("Error al crear la solicitud de admisión", `La solicitud de admisión no se ha podido crear debido a un error inesperado: ${error}`, "error", null);
        }
    }
    return (
        <main>
            <section id="admision">
                <form className='form-admin'>
                    <img src="img/logo_azul.png" alt="Imagen del logo de la universidad" id="logo" />
                    <h1>Solicitud de admisión</h1>
                    <label htmlFor="name">Nombre completo:</label>
                    <input type="text" name="name" id="name" placeholder='Ingresa tu nombre completo' value={name} onChange={(event) => (setName(event.target.value))} required/>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="text" name="email" id="email" placeholder='Ingresa tu email' value={email} onChange={(event) => (setEmail(event.target.value))} required/>
                    <label htmlFor="carrera">Selecciona tu carrera de interés: </label>
                    <select name="carrera" id="carrera" onChange={(event)=>{setIdCarrera(event.target.value)}}>
                        {carreras.map((carrera, index) => (
                            <option value={carrera.id} key={index}>{carrera.name}</option>
                        ))}
                    </select>
                    <label htmlFor="solicitud de admisión">Mensaje al reclutador:</label>
                    <textarea name="solicitud de admisión" id="solicitud de admisión" cols="30" rows="10" value={message} onChange={(event) => (setMessage(event.target.value))} required></textarea>
                    <button type="button" id="btn-enviar" className='button' onClick={() => (createMessage())}>Enviar solicitud de admisión</button>
                </form>
            </section>
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
        </main>
    );
}
 
export default Admission;