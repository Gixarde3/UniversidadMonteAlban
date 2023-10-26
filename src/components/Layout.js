import './css/Page.css';
import React from 'react';
import Header from './Header'
import Footer from './Footer'
import {useEffect} from 'react'
function Layout({ Page, Title }) {
    useEffect(() => {
      document.title = Title; // Establece el título como una cadena de texto
    }, [Title]);
    
    return (
        <>
            <Header />
            <Page />
            <Footer />
        </>
    );
}

export default Layout;