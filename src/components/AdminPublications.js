import SearchPublication from "./SearchPublication";
import FormImage from "./FormImage";
import config from "./config.json";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
function AdminPublications() {
    const navigate = useNavigate();
    useEffect(() => {
        const isAdmin = async () => {
            const response = await axios.post(`${config.endpoint}/admin`,{
                cookie: Cookies.get('session')
            });
            if(response.data.success === false){
                Cookies.remove('session');
                Cookies.remove('role');
                Cookies.remove('username');
                window.location.reload();
                navigate('/');
            }
        }
        isAdmin();
    }, [navigate]);
    return ( 
        <section id="manage-publications" className="section-admin">
            <h2>Gestión de publicaciones</h2>
            <SearchPublication />
            <section id="create-publication" className="section-admin">
                <FormImage />
            </section>
        </section>
     );
}

export default AdminPublications;