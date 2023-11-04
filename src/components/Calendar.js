import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarSpecial = () => {
  const specialDates = [
    { id_date: 1, type: 'type1', date: '2023-11-10', event: 'Evento 1', post: 1 },
    { id_date: 2, type: 'type2', date: '2023-11-20', event: 'Evento 2', post: 2 },
    { id_date: 3, type: 'type1', date: '2023-11-25', event: 'Evento 3', post: 3 },
  ]; // Fechas especiales


  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(new Date());

  const getTileClassName = ({date}) => {
    if (selectedDate && date.getDate() === selectedDate.getDate()) {
        return 'selected-date';
    }
    const specialDate = specialDates.find((dateInfo) => dateInfo.date === date.toISOString().split('T')[0]);
    if (specialDate) {
      return ["special-date", `${specialDate.type}`];
    }
    return null;
  };

  const handleDateClick = (value) => {
    setSelectedDate(value);
    const clickedDate = value.toISOString().split('T')[0];
    const specialDate = specialDates.find((date) => date.date === clickedDate);
    if (specialDate) {
      console.log('Special Date:', specialDate);
    }
  };

  return (
    <div>
      <Calendar
        value={date}
        onChange={setDate}
        tileClassName={getTileClassName}
        onClickDay={handleDateClick}
      />
    </div>
  );
};

export default CalendarSpecial;