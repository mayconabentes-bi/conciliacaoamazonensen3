import { Link } from 'react-router-dom';
import { 
    GraduationCap, 
    Library, 
    Calendar, 
    Anchor, 
    Rocket, 
    History, 
    Users,
    HelpCircle 
} from 'lucide-react';
import './Instituto.css';

const iconMap = {
    GraduationCap,
    Library,
    Calendar,
    Anchor,
    Rocket,
    History,
    Users
};

const Instituto = ({ content }) => {
    const data = content;
    const PROJECTS = data.projects;

    // Helper to render Lucide icons dynamically
    const renderIcon = (iconName) => {
        const IconComponent = iconMap[iconName] || HelpCircle;
        return <IconComponent size={22} strokeWidth={1.5} />;
    };

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
                        {PROJECTS.map((proj, index) => {
                            const CardContent = (
                                <>
                                    <div className="pillar-icon">{renderIcon(proj.icon)}</div>
                                    <h4>{proj.title}</h4>
                                    <p>{proj.desc}</p>
                                    {proj.link && <span className="card-link-hint">Ver detalhes →</span>}
                                </>
                            );

                            if (proj.link) {
                                return (
                                    <Link 
                                        key={index} 
                                        to={proj.link} 
                                        id={sanitizeId(proj.title)} 
                                        className={`pillar-card reveal reveal-delay-${index} clickable`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        {CardContent}
                                    </Link>
                                );
                            }

                            return (
                                <div key={index} id={sanitizeId(proj.title)} className={`pillar-card reveal reveal-delay-${index}`}>
                                    {CardContent}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Instituto;
