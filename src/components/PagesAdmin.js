import { Link} from "react-router-dom";
import config from "./config.json";
import Cookies from 'js-cookie';
function PagesAdmin() {
    const endpointLocal = config.endpointLocal;
    return (
        <>
            <Link to={`${endpointLocal}`}>Pagina principal</Link>
            <Link to={`${endpointLocal}admin/posts`}>Publicaciones</Link>
            <Link to={`${endpointLocal}admin/careers`}>Oferta educativa</Link>
            <Link to={`${endpointLocal}admin/suggestions`}>Sugerencias</Link>
            <Link to={`${endpointLocal}admin/admissions`}>Admisiones</Link>
            <Link to={`${endpointLocal}admin/calendar`}>Calendario</Link>
            {Cookies.get('role') === '3' ? <Link to={`${endpointLocal}admin/users`}>Administardores</Link> : null}
            <Link to={`${endpointLocal}admin/testimonials`}>Testimonios</Link>
            {Cookies.get('role') === '3' ? <Link to={`${endpointLocal}admin/bd`}>Restauración de la BD</Link> : null}
        </>
    );
}

export default PagesAdmin;