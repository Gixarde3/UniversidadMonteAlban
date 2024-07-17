import './css/Home.css';
import ImageSlider from './ImageSlider'
import TestimonialSlider from './TestimonialSlider';
import CalendarSpecial from './Calendar';
function Home() {
    return (
            <main>
                <ImageSlider />
                <section id="phrase">
                    <h2>Líderes Que Transforman Al Mundo</h2>
                </section>
                <section id="somos">
                    <div className="image_container" id="img_somos">
                        <img src="img/imagen_somos.jpg" alt="Universidad Monte Albán: Estudiantes de licenciatura escribiendo" />
                    </div>
                    <article id="art_somos">
                        <h1>Somos <span id="nombre_universidad">Monte Albán</span></h1>
                        <p>Somos un Instituto Educativo con más de 25 años de experiencia, comprometidos con la formación de líderes profesionales con responsabilidad social, calidad humana y visión global, preparados para integrarse a ambientes de trabajo multidisciplinarios.</p>
                    </article>
                </section>
                <section id="testimonials">
                    <TestimonialSlider /> 
                </section>
                <section id="calendar">
                    <h2>Próximos eventos</h2>
                    <CalendarSpecial />
                </section>
                <section id="map">
                    <h2>Encuéntranos</h2>
                    <p id = "address">Calle Ámbar #1 Col. la joya Yautepec Morelos. CP. 62735</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.953539941498!2d-99.1279729893732!3d18.889142182203404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce743fb31e50f5%3A0x869013f8cda27fc3!2sAmbar%201%2C%20La%20Joya%2C%2062730%20La%20Joya%2C%20Mor.!5e0!3m2!1ses!2smx!4v1696348076523!5m2!1ses!2smx" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map"></iframe>
                </section>
            </main>
    );
}
 
export default  Home;