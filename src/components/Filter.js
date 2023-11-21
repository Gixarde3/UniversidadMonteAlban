import config from './config.json';
import { useState } from 'react';
import './css/filter.css';
function Filter({setValue}) {
    const [filter, setFilter] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const endpointLocal = config.endpointLocal;
    const icons = {
        '0': 'filter.png',
        '1': 'user.png',
        '2': 'date.png'
    }
    const openClose = () => {
        setIsOpen(!isOpen);
    }
    const changeFilter = (filter) => {
        setFilter(filter);
        setValue(filter);
        setIsOpen(false);
    }
    return (
        <div className="filter"
        
            data-tooltip-id="tooltip"
            data-tooltip-content="Cambiar el filtro de búsqueda"
            data-tooltip-place="top"
        >
            <button type="button" className="icon-filter" onClick = {() => {openClose()}}>
                <img className='icon' src={`${endpointLocal}img/${icons[filter]}`} alt="Icono de filtro" />
                <img className={`select ${isOpen ? "open" : ""}`} src={`${endpointLocal}img/flecha_abajo.png`} alt="Icono para seleccionar" />
            </button>
            <div className={`filter-options ${isOpen ? "open" : ""}`}>
                <button className='filter-option' type="button" onClick = {() => {changeFilter(1)}}>
                    <img src={`${endpointLocal}img/user.png`} alt="Icono de usuario" className='icon-option'/>
                    Nombre de usuario</button>
                <button className='filter-option' type="button" onClick = {() => {changeFilter(2)}}>
                    <img src={`${endpointLocal}img/date.png`} alt="Icono de usuario" className='icon-option'/>
                    Fecha de modificación</button>
            </div>
        </div>
        );
}

export default Filter;