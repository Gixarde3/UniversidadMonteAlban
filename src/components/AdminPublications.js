import SearchPublication from "./SearchPublication";
import FormImage from "./FormImage";
function AdminPublications() {
    return ( 
        <section id="manage-publications" className="section-admin">
            <h2>Gestión de publicaciones</h2>
            <SearchPublication />
            <section id="create-publication" className="section-admin">
                <FormImage />
            </section>
        </section>
     );
}

export default AdminPublications;