import './css/subject.css'
import React from 'react';
import config from './config.json';
import {useState} from 'react';
function Subject({ cycle, subjects }) {
    const endpointLocal = config.endpointLocal;
    const [open, setOpen] = useState(false);
    return (<div className="subject">
        <button className={`subject-interaction accept ${open ? "open-button":""}`} onClick={() => setOpen(!open)}>
            <h3>Cuatrimestre {cycle}</h3>
            <img src={`${endpointLocal}img/close.png`} alt="boton-abrir" />
        </button>
        <div className={`subject-list ${open ? "open":""}`}>
            <ul>
                {
                    subjects.map((subject, index) => (
                        <li key={index}><h4>{subject}</h4></li>
                    ))
                }
            </ul>
        </div>
    </div>);
}

export default Subject;