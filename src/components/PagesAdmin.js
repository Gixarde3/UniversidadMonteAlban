import { Link} from "react-router-dom";
import config from "./config.json";
function PagesAdmin() {
    const endpointLocal = config.endpointLocal;
    return (
        <>
            <Link to={`${endpointLocal}`}>Inicio</Link>
            <Link to={`${endpointLocal}admin`}>Inicio de administración</Link>
            <Link to={`${endpointLocal}admin/publicaciones`}>Publicaciones</Link>
            <Link to={`${endpointLocal}admin/oferta`}>Oferta educativa</Link>
            <Link to={`${endpointLocal}admin/sugerencias`}>Sugerencias</Link>
            <Link to={`${endpointLocal}admin/admisiones`}>Admisiones</Link>
            <Link to={`${endpointLocal}admin/calendario`}>Calendario</Link>
            <Link to={`${endpointLocal}admin/usuarios`}>Administardores</Link>
            <Link to={`${endpointLocal}admin/testimonios`}>Testimonios</Link>
            <Link to={`${endpointLocal}admin/bd`}>Restauración de la BD</Link>
        </>
    );
}

export default PagesAdmin;