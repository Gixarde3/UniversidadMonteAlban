import FormImage from "./FormImage";
import Search from "./Search";
import FormTestimonial from "./FormTestimonial";
import './css/testimonial.css';
import config from './config.json';
function HomeAdmin(){
    const endpointImage = config.endpointImage;
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
                            <div className="result" key={index}>
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
                    <Search aBuscar="testimonial" titleSearch="testimonio" 
                     renderResults={(results) => (
                        
                        <div className="results">
                            {
                            (
                                
                                results.reverse().map((result, index) => (
                                    <div className="testimonial" key={index} style={{
                                        width: '100%'
                                    }}>
                                        <div className="testimonial-foto">
                                            <img src={endpointImage + "testimonial/" +result.img}alt="Face of testimonial creator" />
                                        </div>
                                        <div className="testimonial-left">
                                            <p className="testimonial-content">{result.content}</p>
                                            <p className="testimonial-name">
                                                - {result.name}
                                            </p>
                                            <p className="testimonial-relation">
                                                {result.relation}
                                            </p>
                                        </div>
                                    </div>
                                ))
                                
                            )}
                        </div>)}
                    />
                        {
                            (results) => {
                                
                            }
                        }
                    <section id="create-publication" className="section-admin">
                        <FormTestimonial />
                    </section>
                </section>
            </main>
        </>
    );
}

export default HomeAdmin;