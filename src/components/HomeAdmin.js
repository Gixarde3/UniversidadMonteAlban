import FormImage from "./FormImage";
import Search from "./Search";
import FormTestimonial from "./FormTestimonial";
import SearchTestimonial from "./SearchTestimonial";
function HomeAdmin(){
    return(
        <>
            <main>
                <h1>Panel de administración</h1>
                <section id="manage-publications" className="section-admin">
                    <h2>Gestión de publicaciones</h2>
                    <Search aBuscar="post" titleSearch="publicación" 
                    renderResults={(results) => (
                        <div className="results">
                          {
                          results.reverse().map((result, index) => (
                            <div className="result res" key={index}>
                                <img src={result.img} alt={result.legend} />
                                <h4>{result.title}</h4>
                                <p>{result.description}</p>
                            </div>
                          ))
                          }
                        </div>)}
                    />
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