import React, { useState } from 'react';
import './AcademyLock.css';

const AcademyLock = ({ onUnlock }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Obfuscation check for "PAZ"
        const secret = String.fromCharCode(80, 65, 90);
        if (password === secret) {
            onUnlock();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="academy-lock">
            <div className="lock-content reveal">
                <div className="lock-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
                <h2 className="cinzel">Conteúdo Restrito</h2>
                <p className="cormorant">Digite a palavra semestral em letras maiúsculas.</p>
                
                <form onSubmit={handleSubmit} className="lock-form">
                    <div className={`input-group ${error ? 'error' : ''}`}>
                        <input
                            type="password"
                            placeholder="Digite a palavra-passe..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                        <button type="submit" className="unlock-btn">
                            Entrar
                        </button>
                    </div>
                    {error && <span className="error-msg">Palavra-passe incorreta.</span>}
                </form>
                
                <div className="lock-footer">
                    <span className="cinzel">G.B.L.S. Conciliação Amazonense Nº 3</span>
                </div>
            </div>
        </div>
    );
};

export default AcademyLock;
