import React, { useState, useEffect } from 'react';
import config from './config.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import Alert from './Alert';
import './css/roleCombo.css';
function RoleCombo({ defaultRole, idUser }) {
    const [selectedRole, setSelectedRole] = useState(defaultRole);
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const endpoint = config.endpoint;

    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    useEffect(() => {
        setSelectedRole(defaultRole);
    }, [defaultRole]);

    const handleRoleChange = (event, idUser) => {
        const newRole = event.target.value;
        setSelectedRole(newRole);
        changeRole(event, idUser, newRole);
    };

    const changeRoleSubmit = async(newRole, idUser) => {
        try {
            openAlert("Cambiando...", `Se está cambiando el rol del usuario`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/user/change-role/${idUser}`, {role: newRole, cookie: Cookies.get('session')});
            if(!response || !response.data || response.data.success === false){
                openAlert("Error inesperado", `El rol no se ha podido cambiar debido a un error inesperado`, "error", null, false);
            }else{
                openAlert("Rol cambiado", "El rol se ha cambiado con éxito", "success", null, false);
            }
        } catch (error) {
            openAlert("Error de conexión", `La petición ha fallado por ${error}`, "error", null, false);
        }
    }

    const changeRole = async(event, idUser, newRole) => {
        await openAlert("¿Seguro de cambiar el rol?", `Cambiarás los permisos de este usuario`, "question", null, true, () => changeRoleSubmit(newRole, idUser));     
    }
    return (
        <>
        <select value={selectedRole} onChange={(event) => {handleRoleChange(event, idUser)}}>
            <option value="1">Usuario</option>
            <option value="2">Administrador</option>
            <option value="3">Superadministrador</option>
        </select>
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
        </>
    );
}

export default RoleCombo;