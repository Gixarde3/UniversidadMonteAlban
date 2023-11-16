import React, { useState, useEffect, useRef } from 'react';
import HeaderDesk from './HeaderDesk';
import HeaderMobile from './HeaderMobile';
import HeaderFixed from './HeaderFixed'
function Header ({isFromAdmin}) {
        const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1199.99);
        const headerRef = useRef(null);
        const newHeaderRef = useRef(null);
        
        useEffect(() => {
            window.addEventListener('resize', handleWindowResize);
            
            const currentRef = headerRef.current;
            const newRef = newHeaderRef.current;
        
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        if (newRef) {
                            newRef.style.display = 'none';
                        }
                    } else {
                        if (newRef) {
                            newRef.style.display = 'flex';
                        }
                    }
                },
                { rootMargin: '-1px' }
            );
        
            if (currentRef) {
                observer.observe(currentRef);
            }
        
            return () => {
                if (currentRef) {
                    observer.unobserve(currentRef);
                }
                window.removeEventListener('resize', handleWindowResize);
            };
        }, [headerRef, newHeaderRef]);
        
        const handleWindowResize = () => {
            setIsLargeScreen(window.innerWidth > 1199.99);
        };
        
    return (
        <>
        {isLargeScreen ? (
            <>
            <header>
                <HeaderDesk headerRef={headerRef} isFromAdmin={isFromAdmin}/>
                <HeaderFixed newHeaderRef={newHeaderRef} isFromAdmin={isFromAdmin}/>
            </header>
            </>
        ) : (
                <HeaderMobile isFromAdmin = {isFromAdmin} /> // Componente para pantallas pequeñas
        )}
        </>
    );
}
export default Header;