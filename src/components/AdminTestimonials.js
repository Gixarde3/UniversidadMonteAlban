import SearchTestimonial from "./SearchTestimonial";
import FormTestimonial from "./FormTestimonial";
function AdminTestimonials() {
    return (
        <section id="manage-testimonials" className="section-admin"> 
            <h2>Gestión de testimonios</h2>
            <SearchTestimonial />
            <section className="section-admin">
                <FormTestimonial />
            </section>
        </section>
    );
}

export default AdminTestimonials;