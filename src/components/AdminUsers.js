import Cookies from "js-cookie";
import SearchUser from "./SearchUser";
import Register from "./Register";
function AdminUsers() {
    return (
        Cookies.get('role') === '3' ? (
            <section id="manage-users" className="section-admin">
                <h2>Gestión de usuarios</h2>
                <SearchUser />
                <h2>Registrar administrador</h2>
                <Register/>
            </section>
        ) : (null)
    );
}

export default AdminUsers;