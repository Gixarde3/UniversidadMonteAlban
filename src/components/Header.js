import React, { useState, useEffect, useRef } from 'react';
import HeaderDesk from './HeaderDesk';
import HeaderMobile from './HeaderMobile';
import HeaderFixed from './HeaderFixed'
function Header({isFromAdmin}) {
        const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768); // Define un punto de corte según el tamaño de la pantalla
        const headerRef = useRef(null);
        const newHeaderRef = useRef(null);
        useEffect(() => {
                // Agrega un evento para detectar cambios en el tamaño de la ventana
                window.addEventListener('resize', handleWindowResize);
                const currentRef = headerRef.current;
                document.title = 'Universidad Monte Albán';
                const observer = new IntersectionObserver(
                        ([entry]) => {
                                if (entry.isIntersecting) {
                                        newHeaderRef.current.style.display = 'none';
                                } else {
                                        newHeaderRef.current.style.display = 'block';
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
                                window.removeEventListener('resize', handleWindowResize);
                        }
                };
        }, []);

        const handleWindowResize = () => {
                setIsLargeScreen(window.innerWidth > 1199.99);
        };

        return (
        <div>
        {isLargeScreen ? (
                <>
                        <div ref={headerRef}>
                                <HeaderDesk ref={headerRef} isFromAdmin = {isFromAdmin}/>
                        </div>
                        <div ref={newHeaderRef}>
                                <HeaderFixed isFromAdmin = {isFromAdmin}/>
                        </div>
                </>
                
        ) : (
                <HeaderMobile isFromAdmin = {isFromAdmin} /> // Componente para pantallas pequeñas
        )}
        </div>
        );
}
export default Header;