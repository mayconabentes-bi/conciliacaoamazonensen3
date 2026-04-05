import React, { useState } from 'react';
import './Testimonials.css';
import PasswordGateModal from '../Academia/PasswordGateModal';
import { useGrauAccess } from '../../hooks/useGrauAccess';

const Testimonials = ({ content, onSubmit }) => {
    const data = content;
    const TESTIMONIALS = data.list;

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showGate, setShowGate] = useState(false);
    const [pendingGrau, setPendingGrau] = useState(null);
    const { verifyPassword, getGrauConfig } = useGrauAccess();
    
    const [formData, setFormData] = useState({
        author: '',
        info: '', // This will be the Lodge
        text: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handlePasswordAttempt = (senhaDigitada) => {
        if (!pendingGrau) return false;
        
        if (verifyPassword(pendingGrau, senhaDigitada)) {
            setTimeout(() => {
                setIsFormVisible(true);
                setShowGate(false);
            }, 1000);
            return true;
        }
        return false;
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'text' && value.length > 200) return;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.author || !formData.info || !formData.text) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({
                ...formData,
                initial: formData.author.charAt(0).toUpperCase(),
                date: new Date().toISOString()
            });
            setSubmitStatus('success');
            setFormData({ author: '', info: '', text: '' });
            setTimeout(() => {
                setIsFormVisible(false);
                setPendingGrau(null);
                setSubmitStatus(null);
            }, 3000);
        } catch (err) {
            console.error('Erro ao enviar:', err);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="testimonials">
            <div className="container">
                <div className="testimonials-header">
                    <div className="gold-line reveal" style={{ justifyContent: 'center' }}><span>{data.tag}</span></div>
                    <h2 className="reveal">O que dizem nossos <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Irmãos</em></h2>
                    <p className="reveal reveal-delay-1">{data.description}</p>
                </div>

                <div className="testimonials-track">
                    {TESTIMONIALS.map((t, index) => (
                        <div key={index} className={`testimonial-card reveal reveal-delay-${index}`}>
                            <div className="testimonial-quote">"</div>
                            <p className="testimonial-text">{t.text}</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">{t.initial}</div>
                                <div className="testimonial-info">
                                    <strong>{t.author}</strong>
                                    <span>{t.info}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="testimonials-submission reveal">
                    {!isFormVisible ? (
                        <div className="degree-selector-container">
                            <h3>Deseja enviar seu depoimento?</h3>
                            <p>Identifique seu grau para acessar o formulário:</p>
                            <div className="degree-cards">
                                {[1, 2, 3].map((g) => (
                                    <button 
                                        key={g} 
                                        className={`degree-card degree-${g}`}
                                        onClick={() => {
                                            setPendingGrau(g);
                                            setShowGate(true);
                                        }}
                                    >
                                        <div className="degree-card-icon">{g === 1 ? '⊿' : g === 2 ? '⬠' : '☆'}</div>
                                        <div className="degree-card-info">
                                            <span>{g}° Grau</span>
                                            <strong>{g === 1 ? 'Aprendiz' : g === 2 ? 'Companheiro' : 'Mestre'}</strong>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="testimonial-form-card">
                            <h3>Enviar Depoimento</h3>
                            {submitStatus === 'success' ? (
                                <div className="status-message success">
                                    Seu depoimento foi enviado com sucesso.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="testimonial-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Nome do Irmão *</label>
                                            <input
                                                type="text"
                                                name="author"
                                                value={formData.author}
                                                onChange={handleFormChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Loja *</label>
                                            <input
                                                type="text"
                                                name="info"
                                                value={formData.info}
                                                onChange={handleFormChange}
                                                required
                                                placeholder="Ex: Conciliação Amazonense Nº 3"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Mensagem * (máx 200 caracteres)</label>
                                        <textarea
                                            name="text"
                                            value={formData.text}
                                            onChange={handleFormChange}
                                            required
                                            rows={4}
                                            maxLength={200}
                                        />
                                        <span className="char-count">{formData.text.length}/200</span>
                                    </div>
                                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Enviando...' : 'Enviar Depoimento'}
                                    </button>
                                    {submitStatus === 'error' && (
                                        <div className="status-message error">
                                            Ocorreu um erro ao enviar. Tente novamente mais tarde.
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showGate && pendingGrau && (
                <PasswordGateModal
                    grau={pendingGrau}
                    pergunta={getGrauConfig(pendingGrau)?.pergunta}
                    onSuccess={handlePasswordAttempt}
                    onClose={() => setShowGate(false)}
                />
            )}
        </section>
    );
};

export default Testimonials;
