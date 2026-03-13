import React, { useState, useRef } from 'react';
import './AcademyDashboard.css';
import { resolveAssetUrl } from '../../utils/resolveAssetUrl';

const AcademyDashboard = ({ content, onLogout }) => {
    const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard' or 'category'
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [visibleItemsCount, setVisibleItemsCount] = useState(12);
    const [viewingItem, setViewingItem] = useState(null);
    const [passwordInput, setPasswordInput] = useState('');
    const [passError, setPassError] = useState(false);
    const [unlockedItems, setUnlockedItems] = useState(new Set());

    const scrollRefs = {
        artigos: useRef(null),
        palestras: useRef(null),
        seminarios: useRef(null),
        biblioteca: useRef(null)
    };

    // Categories to display in Netflix-style rows
    const categories = [
        { id: 'artigos', title: 'Artigos Filosóficos', data: content?.academy?.articles || [] },
        { id: 'palestras', title: 'Ciclo de Palestras', data: content?.lectures?.sections || [] },
        { id: 'seminarios', title: 'Seminários e Eventos', data: content?.seminars?.sections || [] },
        { id: 'biblioteca', title: 'Acervo Digital', data: content?.library?.sections || [] }
    ];

    const handleViewAll = (category) => {
        setSelectedCategory(category);
        setViewMode('category');
        setVisibleItemsCount(12);
        const portal = document.getElementById('academia-portal');
        if (portal) portal.scrollIntoView({ behavior: 'smooth' });
    };

    const handleBackToDashboard = () => {
        setViewMode('dashboard');
        setSelectedCategory(null);
        const portal = document.getElementById('academia-portal');
        if (portal) portal.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScroll = (id, direction) => {
        const container = scrollRefs[id].current;
        if (container) {
            const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleItemClick = (item) => {
        if (item.access === 'restricted' && !unlockedItems.has(item.title)) {
            setViewingItem({ ...item, isLocked: true });
        } else {
            setViewingItem({ ...item, isLocked: false });
        }
    };

    const handleUnlockItem = (e) => {
        e.preventDefault();
        // Obfuscated check for "PAZ"
        const secret = String.fromCharCode(80, 65, 90);
        if (passwordInput.trim().toUpperCase() === secret) {
            setUnlockedItems(prev => new Set([...prev, viewingItem.title]));
            setViewingItem(prev => ({ ...prev, isLocked: false }));
            setPasswordInput('');
            setPassError(false);
        } else {
            setPassError(true);
            setTimeout(() => setPassError(false), 2000);
        }
    };

    const closeItemModal = () => {
        setViewingItem(null);
        setPasswordInput('');
        setPassError(false);
    };

    const renderCard = (item, catTitle, idx) => {
        const isLocked = item.access === 'restricted' && !unlockedItems.has(item.title);
        
        return (
            <div 
                key={idx} 
                className={`content-card ${isLocked ? 'locked-card' : ''}`} 
                style={{ transitionDelay: `${idx * 0.05}s` }}
                onClick={() => handleItemClick(item)}
            >
                <div className="card-media">
                    {item.image ? (
                        <img src={resolveAssetUrl(item.image)} alt={item.title} className="card-img" />
                    ) : (
                        <div className="card-icon-overlay">
                            <span>{item.icon || '✦'}</span>
                        </div>
                    )}
                    <div className="card-badge">{item.cat || catTitle.split(' ')[0]}</div>
                    {isLocked && (
                        <div className="lock-overlay">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                    )}
                </div>
                <div className="card-info">
                    <h4 className="cinzel">{item.title}</h4>
                    <p className="cormorant">
                        {isLocked 
                            ? 'Conteúdo restrito. Clique para desbloquear com a palavra semestral.' 
                            : (item.excerpt || (item.content ? item.content.substring(0, 100) + '...' : 'Conteúdo exclusivo para membros.'))}
                    </p>
                    <div className="card-meta">
                        {item.access === 'restricted' && <span className="access-tag">🔒 Restrito</span>}
                        {item.meta ? (
                            <>
                                <span>{item.meta[0]}</span>
                                <span className="dot"></span>
                                <span>{item.meta[1]}</span>
                            </>
                        ) : (
                            <span>Destaque Acadêmico</span>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderVideoPlayer = (url) => {
        if (!url) return null;
        
        // Basic YouTube embed conversion
        let embedUrl = url;
        if (url.includes('youtube.com/watch?v=')) {
            embedUrl = url.replace('watch?v=', 'embed/');
        } else if (url.includes('youtu.be/')) {
            embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
        }

        return (
            <div className="video-wrapper">
                <iframe 
                    src={embedUrl} 
                    title="Conteúdo em Vídeo" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
        );
    };

    return (
        <div className={`academy-dashboard ${(viewMode === 'category' && selectedCategory) ? 'category-view' : ''}`}>
            {viewMode === 'category' && selectedCategory ? (
                <>
                    <header className="dashboard-header container">
                        <div className="dashboard-header-top">
                            <button onClick={handleBackToDashboard} className="back-btn cinzel">← Voltar</button>
                            <button onClick={onLogout} className="logout-btn cinzel">Sair</button>
                        </div>
                        <h2 className="cinzel">{selectedCategory.title}</h2>
                        <p className="cormorant">Pesquisa e aprofundamento nos temas da Ordem.</p>
                    </header>

                    <main className="container">
                        <div className="category-grid">
                            {selectedCategory.data.slice(0, visibleItemsCount).map((item, idx) => renderCard(item, selectedCategory.title, idx))}
                        </div>
                        
                        {visibleItemsCount < selectedCategory.data.length && (
                            <div className="load-more-container">
                                <button 
                                    className="load-more-btn cinzel"
                                    onClick={() => setVisibleItemsCount(prev => prev + 12)}
                                >
                                    Carregar Mais
                                </button>
                            </div>
                        )}
                    </main>
                    
                    <footer className="dashboard-footer container">
                        <div className="footer-status">
                            <span className="cinzel">Fim da Lista</span>
                        </div>
                    </footer>
                </>
            ) : (
                <>
                    <header className="dashboard-header container">
                        <div className="dashboard-header-top">
                            <div className="gold-line"><span>Academia Virtual</span></div>
                            <button onClick={onLogout} className="logout-btn cinzel">Sair</button>
                        </div>
                        <h2 className="cinzel">Bem-vindo à <em>Arte Real</em></h2>
                        <p className="cormorant">Sua plataforma centralizada de estudos maçônicos.</p>
                    </header>

                    <main className="dashboard-content">
                        {categories.map((cat, rowIdx) => (
                            <section key={cat.id} className="dashboard-row" id={cat.id}>
                                <div className="container">
                                    <h3 className="row-title cinzel">
                                        {cat.title}
                                        <span className="view-all" onClick={() => handleViewAll(cat)}>Ver tudo →</span>
                                    </h3>
                                    
                                    <div className="row-container">
                                        <button className="scroll-btn prev" onClick={() => handleScroll(cat.id, 'left')}>‹</button>
                                        <div className="row-scroll" ref={scrollRefs[cat.id]}>
                                            {cat.data.map((item, itemIdx) => renderCard(item, cat.title, itemIdx))}
                                        </div>
                                        <button className="scroll-btn next" onClick={() => handleScroll(cat.id, 'right')}>›</button>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </main>

                    <footer className="dashboard-footer container reveal">
                        <div className="footer-status">
                            <span className="dot pulse"></span>
                            <span className="cinzel">Sessão Ativa: Acesso Semestral Liberado</span>
                        </div>
                    </footer>
                </>
            )}

            {/* Content Detail Modal */}
            {viewingItem && (
                <div className="academy-modal" onClick={closeItemModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={closeItemModal}>&times;</button>
                        
                        {viewingItem.isLocked ? (
                            <div className="modal-lock-view">
                                <div className="lock-icon-large">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </div>
                                <h3 className="cinzel">Conteúdo Restrito</h3>
                                <p className="cormorant">Este material é destinado a obreiros regulares. Digite a palavra semestral em letras maiúsculas para liberar.</p>
                                
                                <form onSubmit={handleUnlockItem} className="modal-lock-form">
                                    <input 
                                        type="password" 
                                        placeholder="Palavra semestral..." 
                                        value={passwordInput}
                                        onChange={e => setPasswordInput(e.target.value)}
                                        className={passError ? 'error' : ''}
                                        autoFocus
                                    />
                                    <button type="submit">Desbloquear</button>
                                    {passError && <p className="error-msg">Palavra-passe incorreta.</p>}
                                </form>
                            </div>
                        ) : (
                            <div className="modal-scrollable">
                                {viewingItem.video && renderVideoPlayer(viewingItem.video)}
                                {!viewingItem.video && viewingItem.image && (
                                    <img src={resolveAssetUrl(viewingItem.image)} alt={viewingItem.title} className="modal-hero-img" />
                                )}
                                
                                <div className="modal-body">
                                    <div className="modal-meta cinzel">
                                        <span>{viewingItem.cat}</span>
                                        <span className="dot"></span>
                                        <span>{viewingItem.meta ? viewingItem.meta.join(' | ') : 'Acadêmico'}</span>
                                    </div>
                                    <h2 className="cinzel">{viewingItem.title}</h2>
                                    <div className="modal-text cormorant">
                                        {viewingItem.content ? viewingItem.content.split('\n\n').map((p, i) => (
                                            <p key={i}>{p}</p>
                                        )) : <p>{viewingItem.excerpt}</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcademyDashboard;
