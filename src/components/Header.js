import React, { useState, useEffect, useRef } from 'react';
import HeaderDesk from './HeaderDesk';
import HeaderMobile from './HeaderMobile';
import HeaderFixed from './HeaderFixed'
function Header({isFromAdmin}) {
        const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
        const headerRef = useRef(null);
        const newHeaderRef = useRef(null);
        
        useEffect(() => {
            window.addEventListener('resize', handleWindowResize);
            document.title = 'Universidad Monte Albán';
            
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
                            newRef.style.display = 'block';
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