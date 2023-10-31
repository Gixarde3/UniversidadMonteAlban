import { Link} from "react-router-dom";
function PagesAdmin() {
    return (
        <>
            <Link to="/">Inicio</Link>
            <Link to="/admin">Inicio de administración</Link>
            <Link to="/admin/publicaciones">Publicaciones</Link>
            <Link to="/admin/oferta">Oferta educativa</Link>
            <Link to="/admin/sugerencias">Sugerencias</Link>
            <Link to="/admin/admisiones">Admisiones</Link>
            <Link to="/admin/calendario">Calendario</Link>
            <Link to="/admin/administradores">Administardores</Link>
            <Link to="/admin/testimonios">Testimonios</Link>
            <Link to="/admin/bd">Restauración de la BD</Link>
        </>
    );
}

export default PagesAdmin;