import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import './Navbar.css';
import logoImg from '../../assets/logo-conciliacao.png';
import OrbitalLogo from './OrbitalLogo';

const Navbar = ({ content, sessions }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Dynamic Session Logic
    const getNextSession = () => {
        if (!sessions || sessions.length === 0) return content?.announce;
        
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        
        const upcoming = [...sessions]
            .filter(s => s.date >= todayStr)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
            
        if (upcoming.length > 0) {
            const next = upcoming[0];
            const dateObj = new Date(next.date + 'T00:00:00');
            const formattedDate = dateObj.toLocaleDateString('pt-BR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            });
            
            return {
                text: next.title,
                date: `${formattedDate} — ${next.time}h`,
                linkText: 'Conheça nossa história →',
                link: next.link || '#historia'
            };
        }
        
        return content?.announce;
    };

    const nextSession = getNextSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
    };

    const [isReturning, setIsReturning] = useState(false);

    useEffect(() => {
        const visited = localStorage.getItem('hasVisited');
        if (visited) {
            setIsReturning(true);
        } else {
            localStorage.setItem('hasVisited', 'true');
        }
    }, []);

    const openSearch = () => {
        window.dispatchEvent(new CustomEvent('openCommandPalette'));
    };

    if (!content) return null;

    return (
        <header className="main-header">
            <div className="announce">
                <p>
                    <span className="session-badge">Próxima Sessão</span>
                    <span className="session-title">{nextSession?.text}</span>
                    <span className="session-date">{nextSession?.date}</span>
                    <Link to={nextSession?.link}>{nextSession?.linkText}</Link>
                    {isReturning && (
                        <>
                            <span className="separator">|</span>
                            <Link to="#academia" className="top-quick-access">Acesso Rápido</Link>
                        </>
                    )}
                </p>
            </div>

            <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isReturning ? 'is-returning' : ''}`} id="navbar">
                <div className="container">
                    <div className="nav-inner">
                        <Link to="/" className="nav-logo">
                            <OrbitalLogo size={isScrolled ? 48 : 56} />
                            <div className="nav-logo-text">
                                <span className="official-name">
                                    GRANDE BENEMÉRITA LOJA SIMBÓLICA<br />
                                    CONCILIAÇÃO AMAZONENSE Nº 3
                                </span>
                            </div>
                        </Link>

                        <ul className="nav-links">
                            {content.links.map((link, index) => (
                                <li key={index} className="nav-item">
                                    <Link to={link.href}>
                                        {link.label} {link.dropdown && <span className="chevron">▾</span>}
                                    </Link>
                                    {link.dropdown && (
                                        <div className="nav-dropdown">
                                            {link.dropdown.map((drop, dIdx) => (
                                                <React.Fragment key={dIdx}>
                                                    <div className="nav-dropdown-title">{drop.title}</div>
                                                    {drop.items.map((item, iIdx) => (
                                                        <Link key={iIdx} to={item.href}>{item.label}</Link>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="nav-actions">
                            <button className="btn-search-trigger" onClick={openSearch} title="Buscar conteúdo (Ctrl+K)">
                                <Search size={18} />
                            </button>
                            <Link to="/login" className="btn-nav-outline">Painel de Gestão</Link>
                        </div>

                        <button className="nav-hamburger" onClick={toggleMenu} aria-label="Menu">
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} id="mobileMenu">
                <button className="mobile-menu-close" onClick={toggleMenu}>✕</button>
                {content.links.map((link, index) => (
                    <React.Fragment key={index}>
                        <Link to={link.href} onClick={toggleMenu}>{link.label}</Link>
                        {link.dropdown && link.dropdown.map((drop, dIdx) => (
                            drop.items.map((item, iIdx) => (
                                <Link key={`${dIdx}-${iIdx}`} to={item.href} onClick={toggleMenu} style={{ paddingLeft: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                    {item.label}
                                </Link>
                            ))
                        ))}
                    </React.Fragment>
                ))}
                <Link to={content.actions.outlineHref} onClick={toggleMenu}>{content.actions.outline}</Link>
            </div>
        </header>
    );
};

export default Navbar;
