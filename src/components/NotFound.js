import config from './config.json';
function NotFound() {
    const endpointLocal = config.endpointLocal;
    return (<main>
        <section style={{flexDirection:"column", alignItems:"center"}}>
            <img src={`${endpointLocal}img/logo_azul.png`} alt="Logo de la universidad Monte Albán" id="logo" style={{filter:"none"}}/>
            <h1>Error 404 - La página solicitada no existe</h1>
            <h2>La página a la que has intentado acceder no existe, verifica la URL e intenta de nuevo</h2>
        </section>
    </main>);
}

export default NotFound;