import config from './config.json';
import axios from 'axios';
import {useState} from 'react';
import Cookies from 'js-cookie';
import Alert from './Alert';
function AddComent(id_post){
    const endpoint = config.endpoint;
    const [coment, setComent] = useState('');
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
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
        const newComent = coment;
        const cookie = Cookies.get('session');
        try {
            const response = await axios.post(`${endpoint}/coment`, {id_post, coment: newComent, cookie});
            if(response.data.success === false){
                openAlert("Error inesperado", `El comentario no se ha podido crear debido a un error inesperado`, "error", null);
            }else{
                openAlert("Comentario creado", "El comentario se ha creado con éxito", "success", null);
            }
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null);
        }
    };
    return(
        <form onSubmit={handleSubmit} style={
            {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
            }
        }>
            <input type="text" id="new-coment" placeholder='Ingresa un comentario' onChange={(event) => (setComent(event.target.value))}/>
            <button type="submit" id="create-coment"><img src="img/coment.webp" alt="Comentar"/></button>
        <Alert
                isOpen={alertOpen}
                closeAlert={closeAlert}
                title={alert ? alert.title : ''}
                message={alert ? alert.message : ''}
                kind = {alert ? alert.kind : ''}
                redirectRoute={alert ? alert.redirectRoute : ''}
            />
        </form>
    );
}

export default AddComent;