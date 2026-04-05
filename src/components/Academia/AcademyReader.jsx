import React, { useEffect } from 'react';
import { X, Lock, Shield, ArrowUp } from 'lucide-react';
import { resolveAssetUrl } from '../../utils/resolveAssetUrl';
import './AcademyReader.css';

const grauColors = { 1: '#4a90d9', 2: '#c9a84c', 3: '#d44a4a' };

const AcademyReader = ({ item, onClose, isLocked, grauName, userGrauName }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    const renderVideoPlayer = (url) => {
        if (!url) return null;
        let embedUrl = url;
        if (url.includes('youtube.com/watch?v=')) {
            embedUrl = url.replace('watch?v=', 'embed/');
        } else if (url.includes('youtu.be/')) {
            embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
        }
        return (
            <div className="academy-reader-video">
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

    const grau = item.grau || 1;

    return (
        <div className="academy-reader-overlay">
            <div className="academy-reader-container">
                <button className="academy-reader-close" onClick={onClose} aria-label="Encerrar Acesso">
                    <X size={20} />
                    <span className="close-text cinzel">Encerrar Acesso</span>
                </button>

                {isLocked ? (
                    <div className="academy-reader-locked">
                        <div className="locked-visual">
                            <div className="locked-shield" style={{ '--grau-color': grauColors[grau] }}>
                                <Shield size={64} />
                                <Lock size={24} className="locked-padlock" />
                            </div>
                        </div>
                        <h3 className="cinzel">Conteúdo do {grau}° Grau</h3>
                        <p className="cormorant locked-desc">
                            Este material é destinado ao grau de <strong>{grauName}</strong>.
                        </p>
                        <p className="cormorant locked-sub">
                            Você está visualizando como <strong>{userGrauName}</strong>.
                            Selecione o grau correspondente no topo da página para desbloquear.
                        </p>
                        <div className="locked-action">
                            <ArrowUp size={16} />
                            <span className="cinzel">Altere seu grau acima</span>
                        </div>
                        <div className="locked-item-preview">
                            <h4 className="cinzel">{item.title}</h4>
                            {item.meta && (
                                <div className="locked-meta">
                                    {item.meta.map((m, i) => (
                                        <span key={i}>{m}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="academy-reader-content">
                        {item.video ? (
                            renderVideoPlayer(item.video)
                        ) : item.image ? (
                            <div className="academy-reader-hero">
                                <img src={resolveAssetUrl(item.image)} alt={item.title} />
                            </div>
                        ) : null}

                        <div className="academy-reader-article">
                            <div className="academy-reader-meta cinzel">
                                <span className="cat">{item.cat}</span>
                                <span className="grau-indicator" style={{ background: grauColors[grau] }}>
                                    <Shield size={10} /> {grau}° Grau
                                </span>
                                {item.meta && item.meta.map((m, i) => (
                                    <React.Fragment key={i}>
                                        <span className="dot">·</span>
                                        <span>{m}</span>
                                    </React.Fragment>
                                ))}
                            </div>

                            <h1 className="cinzel">{item.title}</h1>

                            {/* Course progress */}
                            {item.totalLessons && (
                                <div className="reader-progress">
                                    <div className="reader-progress-bar">
                                        <div
                                            className="reader-progress-fill"
                                            style={{ width: `${Math.round((item.completedLessons / item.totalLessons) * 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="cinzel">
                                        {item.completedLessons}/{item.totalLessons} aulas · {Math.round((item.completedLessons / item.totalLessons) * 100)}% concluído
                                    </span>
                                </div>
                            )}

                            <div className="academy-reader-body cormorant">
                                {item.content ? item.content.split('\n\n').map((p, i) => (
                                    <p key={i}>{p}</p>
                                )) : <p>{item.excerpt}</p>}
                            </div>

                            <div className="academy-reader-footer">
                                <p className="cinzel">Fim do material</p>
                                <span className="gold-diamond"></span>
                                <button className="academy-reader-close-bottom cinzel" onClick={onClose}>
                                    <Lock size={16} />
                                    Encerrar Acesso
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AcademyReader;
