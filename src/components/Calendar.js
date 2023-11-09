import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './css/calendar.css';
import axios from 'axios';
import Alert from './Alert';
import config from './config.json';
import Modal from './Modal';
const CalendarSpecial = () => {
  const [specialDates, setSpecialDates] = useState([]);
  const [alert, setAlert] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [date, setDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const endpoint = config.endpoint;
  const endpointImage = config.endpointImage;
  useEffect(() => { 
    const getSpecialDates = async () => {
      try {
        const response = await axios.get(`${endpoint}/events`);
        setSpecialDates(response.data);
        console.log(response.data);
      } catch (error) {
        openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
      }
    };
    getSpecialDates();
  }, [endpoint]);

  const closeAlert = () => {
      setAlert(null);
      setAlertOpen(false);
  };

  const openAlert = (title, message, kind, redirectRoute) => {
      setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute});
      setAlertOpen(true);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
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

  const handleDateClick = (value) => {
    setSelectedDate(value);
    const clickedDate = value.toISOString().split('T')[0];
    const specialDate = specialDates.find((date) => date.date === clickedDate);
    if (specialDate) {
      setSelectedDateData(specialDate);
    }
  };

  const openPost = async(idPost) => {
    const response = await axios.get(`${endpoint}/post/?id_post=${idPost}`);
    console.log(`${endpoint}/post/?id_post=${idPost}`)
    console.log(response.data);
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
        <div className="separator">
            <span className="color type-0"></span>
            <p>Seleccionada</p>
          </div>
          <div className="separator">
            <span className="color type-1"></span>
            <p>Evento 1</p>
          </div>
          <div className="separator">
            <span className="color type-2"></span>
            <p>Evento 1</p>
          </div>
          <div className="separator">
            <span className="color type-3"></span>
            <p>Evento 1</p>
          </div>
          <div className="separator">
            <span className="color type-4"></span>
            <p>Evento 1</p>
          </div>
          <div className="separator">
            <span className="color type-5"></span>
            <p>Evento 1</p>
          </div>
          <div className="separator">
            <span className="color type-6"></span>
            <p>Evento 1</p>
          </div>
          <div className="separator">
            <span className="color type-7"></span>
            <p>Evento 1</p>
          </div>
        </div>
      </div>
      {selectedDateData  ? (<div id="special-date">
        <h2>Fecha seleccionada</h2>
        <p>{selectedDate.toISOString().split('T')[0]}</p>
        <p className='nameEvent'>{selectedDateData.eventName}</p>
        <p>{selectedDateData.description}</p>
        {selectedDateData.idPost ? (<button className='accept' onClick={()=>(openPost(selectedDateData.idPost))}>Abrir publicación relacionada</button>):''}
      </div>):''}
      <Alert
        isOpen={alertOpen}
        closeAlert={closeAlert}
        title={alert ? alert.title : ''}
        message={alert ? alert.message : ''}
        kind = {alert ? alert.kind : ''}
        redirectRoute={alert ? alert.redirectRoute : ''}
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