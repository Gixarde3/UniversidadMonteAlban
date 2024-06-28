import './css/nosotros.css';
function Nosotros(){
    
    return(
        <main>
            <img src="img/logo_azul.png" alt="Imagen de nosotros - Universidad Monte Albán" id="logo_nosotros"/>
            <h1 id="nombre">Universidad <span id="nombre_universidad">Monte Albán</span></h1>
            <h2 id="lema">Formamos líderes para transformar al mundo</h2>
            <section id="mision-vision">
                <div id="mision">
                    <div className="img-container">
                        <img src="img/mision.jpeg" alt="Imagen para el apartado de visión de la Universidad Monte Albán" />
                    </div>
                    <h2>Misión</h2>
                    <p>
                        Formar líderes emprendedores, de clase mundial con calidad humana, viviendo día a día con principios y valores, 
                        capaces de transformar, crear y activar grandes proyectos de vida para el crecimiento de la comunidad, 
                        utilizando la tecnología y métodos didácticos de vanguardia y
                        desarrollando sus inteligencias múltiples, con colaboradores altamente capacitados mejorando
                        nuestra calidad de vida, con espíritu de servicio en un ambiente cordial y agradable.
                    </p>
                </div>
                <div id="vision">
                <div className="img-container">
                        <img src="img/vision.png" alt="Imagen para el apartado de visión de la Universidad Monte Albán" />
                    </div>

                    <h2>Visión</h2>
                    <p>
                        Ser un Instituto Universitario de prestigio reconocido por nuestros colaboradores, clientes y
                        competidores, con presencia a nivel mundial siendo pioneros de la creación de modelos educativos
                        innovadores e integrales, para la formación de alumnos críticos, creativos y analíticos capaces de
                        romper paradigmas, favoreciendo el progreso y la competitividad en el ámbito donde se
                        desarrollen.
                    </p>
                </div>
            </section>
        </main>
    );
}
export default Nosotros;