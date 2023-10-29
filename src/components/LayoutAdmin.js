import './css/Page.css';
import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
function Admin({ Page, Title }){
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Universidad Monte Albán - Administración - "  + Title; // Establece el título como una cadena de texto
        const role = document.cookie.role;
        if(role === '1'){
            navigate('/');
        }
    }, [Title, navigate]);
    
    return(
        <>
            <Header isFromAdmin={true} />
            <Page />
            <Footer />
        </>
    );
}
export default Admin;