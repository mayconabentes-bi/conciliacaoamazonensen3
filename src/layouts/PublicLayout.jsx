import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import CommandPalette from '../components/Navigation/CommandPalette';
import Footer from '../components/Footer/Footer';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    
    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash.replace('#', ''));
                if (element) {
                    const yOffset = -80;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 150);
        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
        }
    }, [pathname, hash]);
    
    return null;
};

const PublicLayout = ({ content, sessions }) => {
    return (
        <div className="app">
            <ScrollToTop />
            <Navbar content={content.nav} sessions={sessions} />
            <CommandPalette />
            
            <main style={{ minHeight: '100vh' }}>
                <Outlet />
            </main>
            
            <Footer content={content.footer} />
        </div>
    );
};

export default PublicLayout;
