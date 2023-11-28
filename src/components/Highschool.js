import config from './config.json';
function Highschool() {
    const endpointLocal = config.endpointLocal;
    return (<main>
        <section id="login">
            <img src={`${endpointLocal}img/logo_azul.png`}alt="Logo de la universidad monte albán" id="logo_nosotros"/>
            <h1>Preparatoria abierta</h1>      
        </section>
    </main>);
}

export default Highschool;