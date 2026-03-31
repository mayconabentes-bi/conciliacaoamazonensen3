import React from 'react';
import { Lock, Clock, Tag } from 'lucide-react';
import { resolveAssetUrl } from '../../utils/resolveAssetUrl';
import './AcademyGrid.css';

const AcademyGrid = ({ items, onItemClick, unlockedItems }) => {
    
    if (!items || items.length === 0) {
        return (
            <div className="academy-empty-state container">
                <p className="cormorant">Nenhum material encontrado para esta categoria ou pesquisa.</p>
            </div>
        );
    }
    
    return (
        <div className="academy-grid-container container">
            <div className="academy-grid">
                {items.map((item, idx) => {
                    const isLocked = item.access === 'restricted' && !unlockedItems.has(item.title);
                    
                    return (
                        <article 
                            key={idx} 
                            className={`academy-card ${isLocked ? 'locked' : ''}`}
                            onClick={() => onItemClick(item, isLocked)}
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
                                
                                <div className="academy-card-badge">{item.cat}</div>
                                
                                {isLocked && (
                                    <div className="academy-card-lock-overlay">
                                        <Lock size={24} />
                                    </div>
                                )}
                            </div>
                            
                            <div className="academy-card-body">
                                <h3 className="cinzel">{item.title}</h3>
                                <p className="cormorant">
                                    {isLocked 
                                        ? 'Conteúdo protegido. Requer palavra de passe semestral para acesso livre.' 
                                        : (item.excerpt || (item.content ? item.content.substring(0, 100) + '...' : 'Descrição indisponível.'))}
                                </p>
                            </div>
                            
                            <div className="academy-card-footer">
                                {item.meta && item.meta.map((m, i) => (
                                    <span key={i} className="academy-card-meta">
                                        {m.includes('min') ? <Clock size={14} /> : <Tag size={14} />}
                                        {m}
                                    </span>
                                ))}
                                {isLocked && (
                                    <span className="academy-card-meta restricted">
                                        <Lock size={14} /> Restrito
                                    </span>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default AcademyGrid;
