import FormImage from "./FormImage";
import FormTestimonial from "./FormTestimonial";
import SearchTestimonial from "./SearchTestimonial";
import SearchPublication from "./SearchPublication";
import SearchUser from "./SearchUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
function HomeAdmin(){
    const navigate = useNavigate();
    useEffect(() => {
        const role = Cookies.get('role');
        if(role === '1' || role === undefined){
            navigate('/');
        }
    }, [navigate]);
    return(
        <>
            <main>
                <h1>Panel de administración</h1>
                {
                    Cookies.get('role') === '3' ? (
                        <section id="manage-users" className="section-admin">
                            <h2>Gestión de usuarios</h2>
                            <SearchUser />
                        </section>
                    ) : (null)
                }
                <section id="manage-publications" className="section-admin">
                    <h2>Gestión de publicaciones</h2>
                    <SearchPublication />
                    <section id="create-publication" className="section-admin">
                        <FormImage />
                    </section>
                </section>
                    <section id="manage-testimonials" className="section-admin"> 
                        <h2>Gestión de testimonios</h2>
                        <SearchTestimonial />
                        <section id="create-publication" className="section-admin">
                            <FormTestimonial />
                        </section>
                    </section>
            </main>
        </>
    );
}

export default HomeAdmin;