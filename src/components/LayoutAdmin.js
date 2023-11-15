import './css/Page.css';
import './css/formAdmin.css';
import './css/admin.css';
import React from 'react';
import Header from "./Header";
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PagesAdmin from './PagesAdmin';
function Admin({ Page, Title }){
    const navigate = useNavigate();
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1199.99);
    useEffect(() => {
        document.title = "Universidad Monte Albán - Administración - "  + Title; // Establece el título como una cadena de texto
        const role = Cookies.get('role');
        if(role === '1' || role === undefined){
            navigate('/');
        }
    }, [Title, navigate]);
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
    }, []);
    const handleWindowResize = () => {
        setIsLargeScreen(window.innerWidth > 1199.99);
    };
    return(
        <>
            <Header isFromAdmin={true} />
            <main style={{flexDirection:'row'}}>
                {isLargeScreen ? <aside className='aside'>
                    <PagesAdmin />
                </aside> : null}
                <Page />
            </main>
        </>
    );
}
export default Admin;