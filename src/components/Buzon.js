import './css/buzon.css';
import config from './config.json';
import axios from 'axios';
import Alert from './Alert';
import {useState} from 'react';
function Buzon() { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    }
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    }
    const endpoint = config.endpoint;
    const createSuggestion = async () => {
        try{
            openAlert("Creando...", `Espere mientras se crea la sugerencia`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/complaint`, {
                name: name,
                email: email,
                content: suggestion
            });
            if(response.data.success){
                openAlert("Sugerencia creada", "La sugerencia se ha creado con éxito. Se te enviará un email con la liga para poder editar y eliminar tu sugerencia.", "success", null);
            }else{
                openAlert("Error al crear la sugerencia", "La sugerencia no se ha podido crear debido a un error inesperado", "error", null);
            }
        }catch(error){
            openAlert("Error al crear la sugerencia", `La sugerencia no se ha podido crear debido a un error inesperado: ${error}`, "error", null);
        }
    }
    return (
        <main>
            <section id="buzon">
                <form className='form-admin'>
                    <img src="img/logo_azul.png" alt="Imagen del logo de la universidad" id="logo" />
                    <h1>Buzón de sugerencias</h1>
                    <label htmlFor="name">Nombre completo:</label>
                    <input type="text" name="name" id="name" placeholder='Ingresa tu nombre completo' value={name} onChange={(event) => (setName(event.target.value))} required/>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="text" name="email" id="email" placeholder='Ingresa tu email' value={email} onChange={(event) => (setEmail(event.target.value))} required/>
                    <label htmlFor="sugerencia">Sugerencia:</label>
                    <textarea name="sugerencia" id="sugerencia" cols="30" rows="10" value={suggestion} onChange={(event) => (setSuggestion(event.target.value))} required></textarea>
                    <button type="button" id="btn-enviar" className='button' onClick={() => (createSuggestion())}>Enviar sugerencia</button>
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
 
export default Buzon;