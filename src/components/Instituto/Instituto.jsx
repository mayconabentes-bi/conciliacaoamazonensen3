import React from 'react';
import './Instituto.css';

const Instituto = ({ content }) => {
    const data = content;
    const PROJECTS = data.projects;

    // Helper to create URL-friendly IDs
    const sanitizeId = (title) => title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');

    return (
        <section className="institute-section" id="instituto">
            <div className="container">
                <div className="institute-inner">
                    <div className="institute-content">
                        <div className="gold-line reveal"><span>{data.tag}</span></div>
                        <h2 className="reveal">Instituto Social<br /><em>Conciliação</em></h2>
                        <blockquote className="reveal reveal-delay-1">
                            {data.quote}
                        </blockquote>
                        <p className="reveal reveal-delay-2">
                            {data.paragraph1}
                        </p>
                        <p className="reveal reveal-delay-3">
                            {data.paragraph2}
                        </p>
                        <a href="#instituto-projects" className="btn-gold reveal reveal-delay-4" style={{ marginTop: '12px' }}>
                            Conhecer nossos projetos →
                        </a>
                    </div>

                    <div className="pillars-grid" id="instituto-projects">
                        {PROJECTS.map((proj, index) => (
                            <div key={index} id={sanitizeId(proj.title)} className={`pillar-card reveal reveal-delay-${index}`}>
                                <div className="pillar-icon">{proj.icon}</div>
                                <h4>{proj.title}</h4>
                                <p>{proj.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Instituto;
