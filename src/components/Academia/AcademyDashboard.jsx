import React, { useRef } from 'react';
import { Lock, Shield, Clock, Tag, BookOpen, Mic, Users, GraduationCap } from 'lucide-react';
import { resolveAssetUrl } from '../../utils/resolveAssetUrl';
import './AcademyDashboard.css';

const catIcons = {
    'Artigos': BookOpen,
    'Palestras': Mic,
    'Seminários': Users,
    'Biblioteca Digital': BookOpen,
    'Cursos': GraduationCap
};

const AcademyDashboard = ({ categorizedItems, categories, userGrau, onViewAll, onItemClick, isLocked, getGrauName }) => {
    const scrollRefs = useRef({});

    const handleScroll = (catId, direction) => {
        const container = scrollRefs.current[catId];
        if (container) {
            const scrollAmount = direction === 'left' ? -container.offsetWidth * 0.8 : container.offsetWidth * 0.8;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const grauColors = { 1: '#4a90d9', 2: '#c9a84c', 3: '#d44a4a' };

    const renderCard = (item, idx) => {
        const locked = isLocked(item);
        const grau = item.grau || 1;
        const isCourse = item.sourceCat === 'Cursos' || item.cat === 'Cursos';
        const progress = isCourse && item.totalLessons ? Math.round((item.completedLessons / item.totalLessons) * 100) : 0;

        return (
            <div
                key={idx}
                className={`dash-card ${locked ? 'dash-card-locked' : ''}`}
                onClick={() => onItemClick(item)}
                style={{ '--card-grau-color': grauColors[grau] }}
            >
                <div className="dash-card-media">
                    {item.image ? (
                        <img src={resolveAssetUrl(item.image)} alt={item.title} className="dash-card-img" />
                    ) : (
                        <div className="dash-card-placeholder">
                            <span>{item.cat?.charAt(0) || '✦'}</span>
                        </div>
                    )}
                    <div className="dash-card-grau-badge" style={{ background: grauColors[grau] }}>
                        {grau}° Grau
                    </div>
                    {locked && (
                        <div className="dash-card-lock">
                            <Lock size={28} />
                            <span className="lock-tooltip">Disponível para {getGrauName(grau)}s</span>
                        </div>
                    )}
                </div>
                <div className="dash-card-body">
                    <h4 className="cinzel">{item.title}</h4>
                    <p className="cormorant">
                        {locked
                            ? `Conteúdo exclusivo para o grau de ${getGrauName(grau)}.`
                            : (item.excerpt || (item.content ? item.content.substring(0, 100) + '...' : ''))
                        }
                    </p>
                    {isCourse && !locked && (
                        <div className="dash-card-progress">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                            <span className="progress-text cinzel">{progress}% concluído</span>
                        </div>
                    )}
                    {item.eventDate && !locked && (
                        <div className="dash-card-event">
                            <Clock size={12} />
                            <span>{new Date(item.eventDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </div>
                    )}
                </div>
                <div className="dash-card-footer">
                    {item.meta && item.meta.map((m, i) => (
                        <span key={i} className="dash-card-meta">
                            {i === 0 ? <Tag size={12} /> : <Clock size={12} />} {m}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="academy-dashboard">
            {categories.map(cat => {
                const items = categorizedItems[cat] || [];
                if (items.length === 0) return null;
                const CatIcon = catIcons[cat] || BookOpen;
                const catId = cat.replace(/\s/g, '-').toLowerCase();

                return (
                    <section key={cat} className="dashboard-row">
                        <div className="container">
                            <h3 className="row-title cinzel">
                                <span className="row-title-text">
                                    <CatIcon size={20} className="row-icon" />
                                    {cat}
                                </span>
                                <span className="view-all" onClick={() => onViewAll(cat)}>Ver tudo →</span>
                            </h3>

                            <div className="row-container">
                                <button className="scroll-btn prev" onClick={() => handleScroll(catId, 'left')}>‹</button>
                                <div
                                    className="row-scroll"
                                    ref={el => { scrollRefs.current[catId] = el; }}
                                >
                                    {items.map((item, idx) => renderCard(item, idx))}
                                </div>
                                <button className="scroll-btn next" onClick={() => handleScroll(catId, 'right')}>›</button>
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default AcademyDashboard;
