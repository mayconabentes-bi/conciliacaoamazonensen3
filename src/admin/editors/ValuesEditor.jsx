import React, { useState } from 'react';

const ValuesEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content);

    const handleChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    const handleCardChange = (index, field, value) => {
        const newCards = [...data.cards];
        newCards[index] = { ...newCards[index], [field]: value };
        setData({ ...data, cards: newCards });
    };

    const handleSave = () => {
        onUpdate(data);
        alert('Conteúdo de Valores atualizado com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Nossos Valores</h1>
                <button className="btn-save" onClick={handleSave}>Salvar Alterações</button>
            </div>

            <div className="admin-card">
                <h3 className="section-title">Cabeçalho da Seção</h3>
                <div className="editor-form">
                    <div className="form-group">
                        <label>Tag</label>
                        <input
                            type="text"
                            value={data.tag}
                            onChange={(e) => handleChange('tag', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Título</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Descrição</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            rows={2}
                        />
                    </div>
                </div>
            </div>

            <div className="cards-editor-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
                {data.cards.map((card, index) => (
                    <div key={index} className="admin-card">
                        <h3 className="section-title">Pilar {card.num}: {card.title}</h3>
                        <div className="editor-form">
                            <div className="form-group">
                                <label>Título do Pilar</label>
                                <input
                                    type="text"
                                    value={card.title}
                                    onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Descrição</label>
                                <textarea
                                    value={card.description}
                                    onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nota/Citação</label>
                                <input
                                    type="text"
                                    value={card.note}
                                    onChange={(e) => handleCardChange(index, 'note', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ValuesEditor;
