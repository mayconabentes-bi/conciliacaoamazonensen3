import React, { useState } from 'react';
import './Testimonials.css';

const Testimonials = ({ content, onSubmit }) => {
    const data = content;
    const TESTIMONIALS = data.list;

    const [secretWord, setSecretWord] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        author: '',
        info: '', // This will be the Lodge
        text: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSecretWordChange = (e) => {
        const word = e.target.value;
        setSecretWord(word);
        // Obfuscation check for "PAZ"
        const secret = String.fromCharCode(80, 65, 90);
        if (word === secret) {
            setIsFormVisible(true);
        }
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
                setSecretWord('');
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
                        <div className="secret-word-container">
                            <label htmlFor="secret-word">Deseja enviar seu depoimento? Digite a palavra semestral em letras maiúsculas:</label>
                            <input
                                type="password"
                                id="secret-word"
                                value={secretWord}
                                onChange={handleSecretWordChange}
                                placeholder="Palavra secreta..."
                                className="secret-input"
                            />
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
        </section>
    );
};

export default Testimonials;
