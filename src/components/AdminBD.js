import SearchBD from './SearchBD';
import Alert from './Alert';
import {useState} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import config from './config.json';
function AdminBD() {
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [sql, setSql] = useState(null);
    const endpoint = config.endpoint;
    const deleteSession = () => {
        Cookies.remove('session');
        Cookies.remove('role');
        Cookies.remove('username');
        window.location.reload();
    }
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    }
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    }
    const askRestore = (event) => {
        event.preventDefault();
        openAlert("Restauración de base de datos", "¿Estás seguro de que deseas restaurar la base de datos? Esta acción no se puede deshacer", "question", null, true, restore);
    }
    const handleFileUpload = (e) => {
        try{
            setSql(e.target.files[0]);
        }catch(error){
            openAlert("Error al subir el archivo", "Ocurrió un error inesperado al subir el archivo", "error", null);
        }
    };
    const restore = async() => {
        try{
            openAlert("Restaurando...", `Espere mientras se restaura la base de datos`, "loading", null, false, null);
            const formData = new FormData();
            formData.append('sql', sql);
            formData.append('cookie', Cookies.get('session'));
            const response = await axios.post(`${endpoint}/database`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Configura el encabezado para enviar datos multipart/form-data
                }
            });
            if(response.data && response.data.success){
                openAlert("Base de datos restaurada", "La base de datos se ha restaurado con éxito", "success", null, false);
                deleteSession();
            }else{
                console.log(response);
                openAlert("Error al restaurar la base de datos", "Ocurrió un error inesperado al restaurar la base de datos", "error", null);
            }
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }
    const handleDownload = () => {
        try{
            // Crea un enlace temporal para descargar el archivo
            openAlert("Respaldando...", `Espere mientras se respalda la base de datos`, "loading", null, false, null);
            const enlace = document.createElement('a');
            enlace.href = `${endpoint}/database/download/${Cookies.get('session')}`;
            enlace.download = "respaldo.sql"; // Cambia el nombre de descarga si es necesario
        
            // Simula un clic en el enlace para iniciar la descarga
            enlace.style.display = 'none';
            document.body.appendChild(enlace);
            openAlert("Base de datos respaldada", "La base de datos se ha respaldado con éxito", "success", null, false);
            enlace.click();
        
            // Elimina el enlace después de la descarga
            document.body.removeChild(enlace);
    
        }catch(error){
            if(error.response !== undefined && error.response.status === 403){
                openAlert("Error al respaldar la base de datos", "Ocurrió un error inesperado al respaldar la base de datos", "error", null);
            }else{
                openAlert('Error inesperado con la descarga', `Error de descarga: ${error}`, 'error', null);
            }
        }
      };
    return (
        <section id="manage-database" className="section-admin">
            <h2>Restauración y respaldo de la base de datos</h2>
            <form onSubmit={askRestore}>
                <div className="form-group" style={{display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    }}>
                    <label htmlFor="sql" className="accept">Ingresa tu archivo de restauración</label>
                    <input type="file" accept=".sql" name="sql" id="sql" className="file" style={{display:'none'}} onChange={(event) => (handleFileUpload(event))}/>
                </div>
                {sql ? (<h4 style={{color:'black', textAlign:'center'}}>Archivo cargado: {sql.name}</h4>) : ''}
                {sql ? <button className='accept'>Cargar archivo</button> : null}
            </form>
            <button type="button" className="accept" style={{fontWeight:'bold'}} onClick={() => (handleDownload())}>Realizar respaldo de la base de datos</button>
            <SearchBD />
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
    );
}

export default AdminBD;