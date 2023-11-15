import Cookies from "js-cookie";
import SearchUser from "./SearchUser";
function AdminUsers() {
    return (
        Cookies.get('role') === '3' ? (
            <section id="manage-users" className="section-admin">
                <h2>Gestión de usuarios</h2>
                <SearchUser />
            </section>
        ) : (null)
    );
}

export default AdminUsers;