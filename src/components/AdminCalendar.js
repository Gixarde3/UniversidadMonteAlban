import CalendarSpecial from "./CalendarAdmin";
function AdminCalendar() {
    return (
        <section id="manage-calendar" className="section-admin"> 
            <h2>Gestión de fechas</h2>
            <CalendarSpecial />
        </section>  
    );
}

export default AdminCalendar;