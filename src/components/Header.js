import React, { useState, useEffect} from 'react';
import HeaderDesk from './HeaderDesk';
import HeaderMobile from './HeaderMobile';
import HeaderFixed from './HeaderFixed'
function Header ({isFromAdmin}) {
        const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1199.99);
        
        useEffect(() => {
            window.addEventListener('resize', handleWindowResize);
        }, []);
        
        const handleWindowResize = () => {
            setIsLargeScreen(window.innerWidth > 1199.99);
        };
        
    return (
        <>
        {isLargeScreen ? (
            <>
            <header>
                <HeaderDesk isFromAdmin={isFromAdmin}/>
                <HeaderFixed  isFromAdmin={isFromAdmin}/>
            </header>
            </>
        ) : (
            <>
                <HeaderMobile isFromAdmin = {isFromAdmin} /> {/* Componente para pantallas pequeñas*/}
            </>
        )}
        
        </>
    );
}
export default Header;