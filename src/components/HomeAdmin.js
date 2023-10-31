import FormImage from "./FormImage";
import SearchPublication from "./SearchPublication";
function HomeAdmin(){
    return(
        <>
            <main>
                <h1>Panel de administración</h1>
                <section id="manage-publications" className="row">
                    <section id="create-publication" className="section-admin">
                        <FormImage />
                    </section>
                    <aside style={{width:'30%'}}>
                        <SearchPublication />
                    </aside>
                </section>
            </main>
        </>
    );
}

export default HomeAdmin;