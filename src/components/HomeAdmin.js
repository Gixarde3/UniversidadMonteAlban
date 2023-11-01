import FormImage from "./FormImage";
import SearchPublication from "./SearchPublication";
import FormTestimonial from "./FormTestimonial";
function HomeAdmin(){
    return(
        <>
            <main>
                <h1>Panel de administración</h1>
                <section id="manage-publications" className="row">
                    <section id="create-publication" className="section-admin">
                        <FormImage />
                    </section>
                    <aside className="search-aside">
                        <SearchPublication />
                    </aside>
                </section>
                <section id="manage-testimonials" className="row">
                    <section id="create-publication" className="section-admin">
                        <FormTestimonial />
                    </section>
                    <aside className ="search-aside">
                        
                    </aside>
                </section>
            </main>
        </>
    );
}

export default HomeAdmin;