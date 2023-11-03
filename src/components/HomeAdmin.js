import FormImage from "./FormImage";
import FormTestimonial from "./FormTestimonial";
import SearchTestimonial from "./SearchTestimonial";
import SearchPublication from "./SearchPublication";
function HomeAdmin(){
    return(
        <>
            <main>
                <h1>Panel de administración</h1>
                <section id="manage-publications" className="section-admin">
                    <h2>Gestión de publicaciones</h2>
                    <SearchPublication />
                    <section id="create-publication" className="section-admin">
                        <FormImage />
                    </section>
                </section>
                    <section id="manage-testimonials" className="section-admin"> 
                        <h2>Gestión de testimonios</h2>
                        <SearchTestimonial />
                        <section id="create-publication" className="section-admin">
                            <FormTestimonial />
                        </section>
                    </section>
            </main>
        </>
    );
}

export default HomeAdmin;