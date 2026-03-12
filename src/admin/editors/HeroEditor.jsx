import React, { useState } from 'react';

const HeroEditor = ({ content, onUpdate }) => {
    const [slides, setSlides] = useState(content.slides);

    const handleUpdate = (index, field, value) => {
        const newSlides = [...slides];
        newSlides[index] = { ...newSlides[index], [field]: value };
        setSlides(newSlides);
    };

    const handleSave = () => {
        onUpdate({ ...content, slides });
        alert('Conteúdo atualizado com sucesso! As mudanças já estão visíveis no site público.');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Hero Slider</h1>
                <button className="btn-save" onClick={handleSave}>Salvar Alterações</button>
            </div>

            {slides.map((slide, index) => (
                <div key={index} className="admin-card">
                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '10px' }}>
                        Slide {index + 1}: {slide.value}
                    </h3>
                    <div className="editor-form">
                        <div className="form-group">
                            <label>Tag (Superior)</label>
                            <input
                                type="text"
                                value={slide.tag}
                                onChange={(e) => handleUpdate(index, 'tag', e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Título (Normal)</label>
                                <input
                                    type="text"
                                    value={slide.title}
                                    onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Título (Destaque/Forte)</label>
                                <input
                                    type="text"
                                    value={slide.strong}
                                    onChange={(e) => handleUpdate(index, 'strong', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea
                                value={slide.description}
                                onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Texto do Botão</label>
                                <input
                                    type="text"
                                    value={slide.btnText}
                                    onChange={(e) => handleUpdate(index, 'btnText', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Link do Botão</label>
                                <input
                                    type="text"
                                    value={slide.btnLink}
                                    onChange={(e) => handleUpdate(index, 'btnLink', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HeroEditor;
