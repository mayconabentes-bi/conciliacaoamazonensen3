import React, { useState } from 'react';
import { Lock, Clock, Tag, BookOpen, GraduationCap, Shield } from 'lucide-react';
import { resolveAssetUrl } from '../../utils/resolveAssetUrl';
import './AcademyGrid.css';

const ITEMS_PER_PAGE = 12;
const grauColors = { 1: '#4a90d9', 2: '#c9a84c', 3: '#d44a4a' };

const AcademyGrid = ({ items, viewType, userGrau, onItemClick, isLocked, getGrauName }) => {
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleCount < items.length;

    if (!items || items.length === 0) {
        return (
            <div className="academy-empty-state container">
                <BookOpen size={48} style={{ opacity: 0.3, color: 'var(--gold)' }} />
                <p className="cormorant">Nenhum material encontrado para esta categoria ou pesquisa.</p>
            </div>
        );
    }

    const renderGridCard = (item, idx) => {
        const locked = isLocked(item);
        const grau = item.grau || 1;
        const isCourse = item.cat === 'Cursos';
        const progress = isCourse && item.totalLessons ? Math.round((item.completedLessons / item.totalLessons) * 100) : 0;

        return (
            <article
                key={idx}
                className={`academy-card ${locked ? 'locked' : ''}`}
                onClick={() => onItemClick(item)}
                style={{ animationDelay: `${idx * 0.05}s` }}
            >
                <div className="academy-card-media">
                    {item.image ? (
                        <img src={resolveAssetUrl(item.image)} alt={item.title} loading="lazy" />
                    ) : (
                        <div className="academy-card-placeholder">
                            <span className="cinzel">{item.cat?.charAt(0) || 'A'}</span>
                        </div>
                    )}
                    <div className="academy-card-grau" style={{ background: grauColors[grau] }}>
                        <Shield size={10} />
                        {grau}° Grau
                    </div>
                    {locked && (
                        <div className="academy-card-lock-overlay">
                            <Lock size={24} />
                            <span className="lock-msg">Disponível para {getGrauName(grau)}s</span>
                        </div>
                    )}
                </div>

                <div className="academy-card-body">
                    <h3 className="cinzel">{item.title}</h3>
                    <p className="cormorant">
                        {locked
                            ? `Conteúdo exclusivo para o grau de ${getGrauName(grau)}.`
                            : (item.excerpt || (item.content ? item.content.substring(0, 100) + '...' : 'Descrição indisponível.'))
                        }
                    </p>
                    {isCourse && !locked && (
                        <div className="card-progress">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                            <span className="progress-label cinzel">{progress}%</span>
                        </div>
                    )}
                    {item.eventDate && (
                        <div className="card-event-date">
                            <Clock size={12} />
                            {new Date(item.eventDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                    )}
                </div>

                <div className="academy-card-footer">
                    {item.meta && item.meta.map((m, i) => (
                        <span key={i} className="academy-card-meta">
                            {i === 0 ? <Tag size={14} /> : <Clock size={14} />} {m}
                        </span>
                    ))}
                    {locked && (
                        <span className="academy-card-meta restricted">
                            <Lock size={14} /> Restrito
                        </span>
                    )}
                </div>
            </article>
        );
    };

    const renderListItem = (item, idx) => {
        const locked = isLocked(item);
        const grau = item.grau || 1;
        const isCourse = item.cat === 'Cursos';
        const progress = isCourse && item.totalLessons ? Math.round((item.completedLessons / item.totalLessons) * 100) : 0;

        return (
            <div
                key={idx}
                className={`list-item ${locked ? 'list-item-locked' : ''}`}
                onClick={() => onItemClick(item)}
                style={{ animationDelay: `${idx * 0.03}s` }}
            >
                <div className="list-item-grau" style={{ background: grauColors[grau] }}>
                    {grau}°
                </div>
                <div className="list-item-content">
                    <h4 className="cinzel">{item.title}</h4>
                    <p className="cormorant">
                        {locked
                            ? `Disponível para ${getGrauName(grau)}s`
                            : (item.excerpt || item.content?.substring(0, 120) + '...')
                        }
                    </p>
                </div>
                <div className="list-item-meta">
                    {item.meta && item.meta.map((m, i) => (
                        <span key={i}>{m}</span>
                    ))}
                    {isCourse && !locked && (
                        <div className="list-progress">
                            <div className="progress-bar-sm">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                            <span>{progress}%</span>
                        </div>
                    )}
                </div>
                <div className="list-item-status">
                    {locked ? <Lock size={16} className="lock-icon" /> : <span className="open-icon">→</span>}
                </div>
            </div>
        );
    };

    return (
        <div className="academy-grid-container container">
            {viewType === 'grid' ? (
                <div className="academy-grid">
                    {visibleItems.map((item, idx) => renderGridCard(item, idx))}
                </div>
            ) : (
                <div className="academy-list">
                    {visibleItems.map((item, idx) => renderListItem(item, idx))}
                </div>
            )}

            {hasMore && (
                <div className="load-more-container">
                    <button className="load-more-btn cinzel" onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}>
                        Carregar Mais ({items.length - visibleCount} restantes)
                    </button>
                </div>
            )}
        </div>
    );
};

export default AcademyGrid;
