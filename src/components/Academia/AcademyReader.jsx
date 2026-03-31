import React, { useEffect, useState } from 'react';
import { X, Lock } from 'lucide-react';
import { resolveAssetUrl } from '../../utils/resolveAssetUrl';
import './AcademyReader.css';

const AcademyReader = ({ item, onClose, isLocked, onUnlock }) => {
    const [passwordInput, setPasswordInput] = useState('');
    const [passError, setPassError] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleUnlockItem = (e) => {
        e.preventDefault();
        const secret = String.fromCharCode(80, 65, 90); // PAZ
        if (passwordInput.trim().toUpperCase() === secret) {
            onUnlock(item.title);
            setPasswordInput('');
            setPassError(false);
        } else {
            setPassError(true);
            setTimeout(() => setPassError(false), 2000);
        }
    };

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

    return (
        <div className="academy-reader-overlay">
            <div className="academy-reader-container">
                <button className="academy-reader-close" onClick={onClose} aria-label="Fechar Leitor">
                    <X size={28} />
                </button>

                {isLocked ? (
                    <div className="academy-reader-lock-view">
                        <div className="lock-icon-large">
                            <Lock size={48} />
                        </div>
                        <h3 className="cinzel">Conteúdo Restrito</h3>
                        <p className="cormorant">Este material é destinado a obreiros regulares. Digite a palavra semestral em letras maiúsculas para liberar a leitura profunda.</p>

                        <form onSubmit={handleUnlockItem} className="academy-reader-lock-form">
                            <input 
                                type="password" 
                                placeholder="Palavra semestral..." 
                                value={passwordInput}
                                onChange={e => setPasswordInput(e.target.value)}
                                className={passError ? 'error' : ''}
                                autoFocus
                            />
                            <button type="submit" className="cinzel">Desbloquear</button>
                            {passError && <p className="error-msg cormorant">A palavra-passe inserida está incorreta.</p>}
                        </form>
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
                                {item.meta && item.meta.map((m, i) => (
                                    <React.Fragment key={i}>
                                        <span className="dot">·</span>
                                        <span>{m}</span>
                                    </React.Fragment>
                                ))}
                            </div>

                            <h1 className="cinzel">{item.title}</h1>

                            <div className="academy-reader-body cormorant">
                                {item.content ? item.content.split('\n\n').map((p, i) => (
                                    <p key={i}>{p}</p>
                                )) : <p>{item.excerpt}</p>}
                            </div>

                            <div className="academy-reader-footer">
                                <p className="cinzel">Fim do material</p>
                                <span className="gold-diamond"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AcademyReader;
