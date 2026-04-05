import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, X, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import './PasswordGateModal.css';

const GRAU_NAMES = { 1: 'Aprendiz', 2: 'Companheiro', 3: 'Mestre' };
const GRAU_COLORS = { 1: '#4a90d9', 2: '#c9a84c', 3: '#d44a4a' };
const GRAU_ICONS = { 1: '⊿', 2: '⬠', 3: '☆' };

const PasswordGateModal = ({ grau, pergunta, onSuccess, onClose }) => {
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        // Focus input after mount animation
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 400);
        return () => {
            document.body.style.overflow = 'auto';
            clearTimeout(timer);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (success) return;

        const isCorrect = onSuccess(senha);

        if (isCorrect) {
            setSuccess(true);
            setError(false);
        } else {
            setError(true);
            setIsShaking(true);
            setAttempts(prev => prev + 1);
            setTimeout(() => {
                setError(false);
                setIsShaking(false);
            }, 2000);
            setSenha('');
            inputRef.current?.focus();
        }
    };

    const grauName = GRAU_NAMES[grau] || 'Desconhecido';
    const grauColor = GRAU_COLORS[grau] || '#c9a84c';

    return (
        <div className="password-gate-overlay" onClick={onClose}>
            <div
                className={`password-gate-modal ${isShaking ? 'shake' : ''} ${success ? 'success' : ''}`}
                onClick={(e) => e.stopPropagation()}
                style={{ '--gate-color': grauColor }}
            >
                {/* Close button */}
                <button className="gate-close-btn" onClick={onClose} aria-label="Fechar">
                    <X size={20} />
                </button>

                {/* Decorative header glow */}
                <div className="gate-glow" />

                {/* Shield icon with grau indicator */}
                <div className="gate-shield-container">
                    <div className="gate-shield-ring">
                        <div className="gate-shield-inner">
                            {success ? (
                                <CheckCircle size={36} className="gate-check-icon" />
                            ) : (
                                <>
                                    <Shield size={36} />
                                    <Lock size={14} className="gate-padlock" />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="gate-grau-badge">
                        {grau}° Grau
                    </div>
                </div>

                {/* Title */}
                <h2 className="gate-title cinzel">
                    {success ? 'Acesso Concedido' : `Área Restrita: ${grauName}`}
                </h2>

                {success ? (
                    <div className="gate-success-content">
                        <p className="cormorant gate-success-msg">
                            Identidade confirmada. O conteúdo do grau de <strong>{grauName}</strong> está agora disponível nesta sessão.
                        </p>
                        <div className="gate-success-symbol cinzel">
                            {GRAU_ICONS[grau]}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Description */}
                        <p className="gate-description cormorant">
                            Este conteúdo é protegido por senha. Para visualizá-lo, por favor, digite a senha abaixo:
                        </p>

                        {/* Ritual question */}
                        <div className="gate-question">
                            <div className="gate-question-ornament">✦</div>
                            <p className="cinzel">{pergunta}</p>
                            <div className="gate-question-ornament">✦</div>
                        </div>

                        {/* Password form */}
                        <form onSubmit={handleSubmit} className="gate-form">
                            <div className={`gate-input-group ${error ? 'gate-error' : ''}`}>
                                <input
                                    ref={inputRef}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Digite a senha em MAIÚSCULAS..."
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="gate-input"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                                <button
                                    type="button"
                                    className="gate-eye-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {error && (
                                <div className="gate-error-msg">
                                    <AlertTriangle size={14} />
                                    <span>Senha incorreta. Acesso negado.</span>
                                </div>
                            )}

                            {attempts >= 3 && (
                                <div className="gate-warning-msg cormorant">
                                    <AlertTriangle size={14} />
                                    <span>Múltiplas tentativas detectadas ({attempts}). Solicite a senha ao Venerável Mestre.</span>
                                </div>
                            )}

                            <button type="submit" className="gate-submit-btn cinzel" disabled={!senha.trim()}>
                                <Lock size={14} />
                                Desbloquear
                            </button>
                        </form>
                    </>
                )}

                {/* Footer branding */}
                <div className="gate-footer">
                    <div className="gate-footer-line" />
                    <span className="cinzel">G∴B∴L∴S∴ Conciliação Amazonense Nº 3</span>
                </div>
            </div>
        </div>
    );
};

export default PasswordGateModal;
