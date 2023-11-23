import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './css/calendar.css';
import axios from 'axios';
import Alert from './Alert';
import config from './config.json';
import Modal from './Modal';
import SelectPublication from './SelectPublication';
import Cookies from 'js-cookie';
const CalendarSpecial = () => {
  const [specialDates, setSpecialDates] = useState([]);
  const [alert, setAlert] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [idPost, setIdPost] = useState(null);
  const [date, setDate] = useState(new Date());
  const [nameEvent, setNameEvent] = useState('');
  const [descriptionEvent, setDescriptionEvent] = useState('');
  const [typeEvent, setTypeEvent] = useState(0);
  const [eliminarPost, setEliminarPost] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const endpoint = config.endpoint;
  const endpointImage = config.endpointImage;
  const endpointLocal = config.endpointLocal;
  useEffect(() => { 
    const getSpecialDates = async () => {
      try {
        const response = await axios.get(`${endpoint}/events`);
        setSpecialDates(response.data);
      } catch (error) {
        openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
      }
    };
    getSpecialDates();
  }, [endpoint]);


  const getSpecialDates = async () => {
    try {
      openAlert("Cargando...", `Cargando fechas especiales`, "loading", null, false, null)
      const response = await axios.get(`${endpoint}/events`);
      setSpecialDates(response.data);
      closeAlert();
    } catch (error) {
      openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
    }
  };
  useEffect(()=>{
    const setData = async () => {
      if(selectedDateData){
        setNameEvent(selectedDateData.eventName);
        setDescriptionEvent(selectedDateData.description);
        setTypeEvent(selectedDateData.type);
        selectedDateData.idPost ? setIdPost(selectedDateData.idPost) : setIdPost(null);
        setEliminarPost(false);
        if(selectedDateData.idPost){
          const response = await axios.get(`${endpoint}/post/?id_post=${selectedDateData.idPost}`);
          setSelectedPost(response.data);
        }else{
          setSelectedPost(null);
        }
      }
    }
    setData();
  }, [selectedDateData, endpoint])

  const tipos = [
    {value: '0', label: 'Seleccionada'},
    {value: '1', label: 'Inicio de cuatrimestre'},
    {value: '2', label: 'Semana de curso de inducción'},
    {value: '3', label: 'Evaluaciones parciales'},
    {value: '4', label: 'Periodo vacacional'},
    {value: '5', label: 'Fin de cuatrimestre'},
    {value: '6', label: 'Suspención de labores'},
    {value: '7', label: 'Entrega de actas de calificación'},
    {value: '8', label: 'Entrega de examenes a revisión'},
    {value: '9', label: 'Reinscripciones'},
    {value: '10', label: 'Consulta de actas finales'},
    {value: '11', label: 'Examenes de regularización'},
    {value: '12', label: 'Entrega de planeaciones'},
    {value: '13', label: 'Conmemoración de fecha importante'},
    {value: '14', label: 'Comunicado'},
  ]
  const closeAlert = () => {
      setAlert(null);
      setAlertOpen(false);
  };

  const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
    setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
    setAlertOpen(true);
};

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getTileClassName = ({date}) => {
    if (selectedDate && date.getDate() === selectedDate.getDate()) {

      return 'selected-date';
    }
    const specialDate = specialDates.find((dateInfo) => dateInfo.date === date.toISOString().split('T')[0]);
    if (specialDate) {
      return ["special-date", `type-${specialDate.type}`];
    }
    return null;
  };

  const setPost = async (idPost) => {
    setIdPost(idPost);
    openAlert("Cargando...", `Cargando post`, "loading", null, false, null)
    const response = await axios.get(`${endpoint}/post/?id_post=${idPost}`);
    setSelectedPost(response.data);
    setEliminarPost(false);
    closeAlert();
  }

  const handleDateClick = (value) => {
    setSelectedDate(value);
    const clickedDate = value.toISOString().split('T')[0];
    const specialDate = specialDates.find((date) => date.date === clickedDate);
    if (specialDate) {
      setSelectedDateData(specialDate);
    }else{
      setSelectedDateData(null);
      setNameEvent('');
      setDescriptionEvent('');
      setTypeEvent("1");
      setIdPost(null);
      setSelectedPost(null);
    }
  };
  const quitPost = () => {
    setSelectedPost(null);
    setIdPost(null);
    setEliminarPost(true);
  }

  

  const editPost = async () => {
    try{
      const formData = new FormData();
      formData.append('event', nameEvent);
      formData.append('description', descriptionEvent);
      formData.append('type', typeEvent);
      formData.append('date', selectedDate.toISOString().split('T')[0]);
      if(idPost){formData.append('post', idPost)}
      if(eliminarPost){formData.append('eliminarPost', eliminarPost)}
      formData.append('cookie', Cookies.get('session'));
      openAlert('Editando...', 'Espere mientras se edita el evento', 'loading', null, false, null);
      const response = await axios.post(`${endpoint}/event/edit/${selectedDateData.id}`, formData);
      if(response.data.success){
        openAlert('Evento editado', 'El evento se ha editado con éxito', 'success', null);
        getSpecialDates();
      }else{
        openAlert('Error inesperado', 'El evento no se ha podido editar debido a un error inesperado', 'error', null);
      }
    }catch(error){
      openAlert('Error inesperado', `El evento no se ha podido editar debido a un error inesperado: ${error}`, 'error', null)
    }
  }
  const deleteEventAsk = () => {
    openAlert('¿Seguro de eliminar?', 'El evento será eliminado definitivamente', 'question', null, true, deleteEvent);
  }
  const deleteEvent = async () => {
    try{
      openAlert('Eliminando...', 'Espere mientras se elimina el evento', 'loading', null, false, null);
      const response = await axios.post(`${endpoint}/event/delete/${selectedDateData.id}`, {cookie: Cookies.get('session')});
      if(response.data.success){
        openAlert('Evento eliminado', 'El evento se ha eliminado con éxito', 'success', null);
        getSpecialDates();
        setSelectedDate(null);
      }else{
        openAlert('Error inesperado', 'El evento no se ha podido eliminar debido a un error inesperado', 'error', null);
      }
    }catch(error){
      openAlert('Error inesperado', `El evento no se ha podido eliminar debido a un error inesperado: ${error}`, 'error', null)
    }
  }
  const createEvent = async () => {
    try{
      const formData = new FormData();
      formData.append('event', nameEvent);
      formData.append('description', descriptionEvent);
      formData.append('type', typeEvent);
      formData.append('date', selectedDate.toISOString().split('T')[0]);
      if(idPost){formData.append('post', idPost)}
      formData.append('cookie', Cookies.get('session'));
      openAlert("Creando...", `Espere mientras se crea el evento`, "loading", null, false, null)
      const response = await axios.post(`${endpoint}/event`, formData);
      if(response.data.success){
        openAlert('Evento creado', 'El evento se ha creado con éxito', 'success', null);
        getSpecialDates();
      }else{
        openAlert('Error inesperado', 'El evento no se ha podido crear debido a un error inesperado', 'error', null);
      }
    }catch(error){
      openAlert('Error inesperado', `El evento no se ha podido crear debido a un error inesperado: ${error}`, 'error', null)
    }
  }
  const openPost = async(idPost) => {
    openAlert("Cargando...", `Cargando post`, "loading", null, false, null)
    const response = await axios.get(`${endpoint}/post/?id_post=${idPost}`);
    closeAlert();
    setSelectedPost(response.data);
    openModal();
  }
  return (
    <>
      <Calendar
        value={date}
        onChange={setDate}
        tileClassName={getTileClassName}
        onClickDay={handleDateClick}
      />
      
      <div id="colors">
        <h4>Clasificación de fechas especiales</h4>
        <div className="colors-separator">
          {
            tipos.map((tipo, index) => (<div className="separator">
              <span className={`color type-${tipo.value}`}></span>
              <p>{tipo.label}</p>
            </div>))
          }
        </div>
      </div>
      {selectedDate ? <div id="special-date" style={{position:'relative'}}>
        {selectedDateData ? <div className="buttons">
            <button type="submit" className="btn-admin eliminar" onClick={() => (deleteEventAsk())}
                data-tooltip-id="tooltip"
                data-tooltip-content="Eliminar evento"
                data-tooltip-place="top"
            >
                <img src={`${endpointLocal}img/close.png`} alt="Icono eliminar" />
            </button>
        </div> : null}
        <h2>{selectedDateData ? ("Editar evento") : "Crear evento"}</h2>
        <p>{selectedDate.toISOString().split('T')[0]}</p>
        <input className='nameEvent inputCalendar' value={nameEvent} onChange={(event)=>(setNameEvent(event.target.value))} placeholder='Ingresa el nombre del evento' required/>
        <textarea className ='inputCalendar' value={descriptionEvent} onChange={(event)=>(setDescriptionEvent(event.target.value))} placeholder='Ingresa la descripción de la publicación' required></textarea>
        <label htmlFor="typeEvent" style={{textAlign: 'center'}}>Selecciona el tipo de evento: </label>
        <select name="typeEvent" id="typeEvent" value={typeEvent} style={{border: '1px solid black'}} onChange={(event)=>(setTypeEvent(event.target.value))} required>
          {
            tipos.map((tipo, index) => (index !== 0 ? <option value={tipo.value}>{tipo.label}</option> : ''))
          }
        </select>
        {selectedPost ?
        <>
          <p>Post seleccionado</p>
          <div className="res" style={{width: '100%'}}>
              <div className="buttons">
                  <button type="submit" className="btn-admin eliminar" onClick={() => (quitPost(selectedPost.id))}
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Quitar publicación"
                      data-tooltip-place="top"
                  >
                      <img src={`${endpointLocal}img/close.png`} alt="Icono eliminar" />
                  </button>
              </div>
              <div className="result" style={{width: '100%'}}>
                  <div className="post-image">
                      <img src={endpointImage + "post/" +selectedPost.img} alt={selectedPost.legend}/>
                  </div>
                  <p className="post-title">{selectedPost.title}</p>
                  <p className="post-description">{selectedPost.description}</p>
                  <p className="post-file">{selectedPost.route}</p>
              </div>
          </div>
          <button className='accept' onClick={()=>(openPost(idPost))}>Previsualización del post seleccionado</button>
          </>:''}
        <SelectPublication selectPublication={setPost}/>
        <button className="accept" onClick={selectedDateData ? () => (editPost()) : () => (createEvent())}>{selectedDateData ? ("Editar evento") : "Crear evento"}</button>
      </div> :''}
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
    <Modal
          isOpen={modalOpen}
          closeModal={closeModal}
          imageSrc={selectedPost ? endpointImage + "post/" + selectedPost.img : ''}
          id_post={selectedPost ? selectedPost.id : ''}
          title={selectedPost ? selectedPost.title : ''}
          imageAlt={selectedPost ? selectedPost.alt : ''}
          description={selectedPost ? selectedPost.description : ''}
          file={selectedPost ? selectedPost.route : ''}
        />
    </>
  );
};

export default CalendarSpecial;