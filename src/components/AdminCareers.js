import SearchCareer from "./SearchCareer";
import FormCareers from "./FormCareers";
import FormSubject from "./FormSubject";
function AdminCareers() {
    return (
        <section id="manage-careers" className="section-admin">
            <h2>Gestión de oferta educativa</h2>
            <SearchCareer />
            <FormCareers />
            <FormSubject />
        </section>
    );
}

export default AdminCareers;