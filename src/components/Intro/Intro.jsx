import React from 'react';
import './Intro.css';
import logoImg from '../../assets/logo-conciliacao.png';

const Intro = ({ content }) => {
    const data = content;

    const MASONIC_TOOLS = [
        // Esquadro (Square)
        { name: 'Esquadro', icon: <path d="M12,10 L12,28 C12,29.1 12.9,30 14,30 L32,30 L32,25 L17,25 L17,10 L12,10 Z" fill="currentColor" /> },
        // Compasso (Compass)
        { name: 'Compasso', icon: <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20,8 L13,28" />
            <path d="M20,8 L27,28" />
            <circle cx="20" cy="8" r="1.5" fill="currentColor" />
            <path d="M16.5,18 Q20,17 23.5,18" />
        </g> },
        // Nível (Level)
        { name: 'Nível', icon: <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10,28 L30,28 L20,12 Z" />
            <line x1="20" y1="12" x2="20" y2="28" />
            <circle cx="20" cy="22" r="1" fill="currentColor" />
        </g> },
        // Prumo (Plumb)
        { name: 'Prumo', icon: <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="20" y1="10" x2="20" y2="22" />
            <path d="M17,22 L23,22 L20,30 Z" fill="currentColor" stroke="none" />
            <path d="M17,22 L23,22 L20,30 Z" />
        </g> },
        // Maço (Maul)
        { name: 'Maço', icon: <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="14" y="12" width="12" height="10" rx="1" />
            <line x1="20" y1="22" x2="20" y2="30" />
            <line x1="17" y1="12" x2="17" y2="22" />
            <line x1="23" y1="12" x2="23" y2="22" />
        </g> },
        // Trolha (Trowel)
        { name: 'Trolha', icon: <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20,10 L12,25 L28,25 Z" />
            <path d="M20,25 L20,30 C20,31 21,32 22,32 L25,32" />
        </g> }
    ];

    return (
        <section className="intro" id="sobre">
            <div className="container">
                <div className="intro-inner">
                    <div className="intro-emblem reveal">
                        <div className="intro-emblem-ring">
                            <div className="intro-tools-orbit">
                                {MASONIC_TOOLS.map((tool, index) => {
                                    const angle = (index * 360) / MASONIC_TOOLS.length;
                                    return (
                                        <div 
                                            key={index} 
                                            className="intro-tool-wrapper"
                                            style={{ transform: `rotate(${angle}deg)` }}
                                        >
                                            <div className="intro-tool-icon">
                                                <svg viewBox="0 0 40 40" width="24" height="24">
                                                    {tool.icon}
                                                </svg>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <img src={logoImg} alt="Emblema Conciliação" style={{ width: '180px', height: '180px', zIndex: 2, position: 'relative' }} />
                        </div>
                    </div>

                    <div className="intro-text">
                        <div className="gold-line reveal"><span>{data.welcome}</span></div>
                        <h2 className="reveal">{data.title}<br /><em>{data.emphasized}</em></h2>
                        <div className="intro-text highlight reveal">
                            {data.highlight}
                        </div>

                        <div className="intro-sections reveal">
                            {data.sections && data.sections.map((section, idx) => (
                                <div key={idx} className="intro-section-block">
                                    {section.title && <h3 className="intro-section-title">{section.title}</h3>}
                                    <p className="intro-section-p">
                                        {section.content}
                                    </p>
                                    {section.bullets && (
                                        <ul className="intro-section-bullets">
                                            {section.bullets.map((bullet, bIdx) => (
                                                <li key={bIdx}>
                                                    <strong>{bullet.title}:</strong> {bullet.text}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="reveal reveal-delay-3" style={{ marginTop: '48px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            <a href="#sobre" className="btn-primary" onClick={(e) => e.preventDefault()}>{data.btnPrimary}</a>
                            <a href="#historia" className="btn-ghost">{data.btnGhost}</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Intro;
