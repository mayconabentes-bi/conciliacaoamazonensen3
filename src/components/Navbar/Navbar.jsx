import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../../assets/logo-conciliacao.png';

const Navbar = ({ content }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    if (!content) return null;

    return (
        <>
            <div className="announce">
                <p>
                    📅 {content.announce.text} <strong style={{ color: 'var(--gold-lt)' }}>{content.announce.date}</strong>
                    &nbsp;·&nbsp;
                    <a href={content.announce.link}>{content.announce.linkText}</a>
                </p>
            </div>

            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
                <div className="container">
                    <div className="nav-inner">
                        <a href="#" className="nav-logo">
                            <img src={logoImg} alt={`Logo ${content.logo.sub}`} />
                            <div className="nav-logo-text">
                                <span className="official-name">{content.logo.name}<br />{content.logo.sub}</span>
                            </div>
                        </a>

                        <ul className="nav-links">
                            {content.links.map((link, index) => (
                                <li key={index} className="nav-item">
                                    <a href={link.href}>
                                        {link.label} {link.dropdown && <span className="chevron">▾</span>}
                                    </a>
                                    {link.dropdown && (
                                        <div className="nav-dropdown">
                                            {link.dropdown.map((drop, dIdx) => (
                                                <React.Fragment key={dIdx}>
                                                    <div className="nav-dropdown-title">{drop.title}</div>
                                                    {drop.items.map((item, iIdx) => (
                                                        <a key={iIdx} href={item.href}>{item.label}</a>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="nav-actions">
                            <Link to={content.actions.outlineHref} className="btn-nav-outline">{content.actions.outline}</Link>
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
                        <a href={link.href} onClick={toggleMenu}>{link.label}</a>
                        {link.dropdown && link.dropdown.map((drop, dIdx) => (
                            drop.items.map((item, iIdx) => (
                                <a key={`${dIdx}-${iIdx}`} href={item.href} onClick={toggleMenu} style={{ paddingLeft: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                    {item.label}
                                </a>
                            ))
                        ))}
                    </React.Fragment>
                ))}
                <Link to={content.actions.outlineHref} onClick={toggleMenu}>{content.actions.outline}</Link>
            </div>
        </>
    );
};

export default Navbar;
