import React, { useState } from 'react';

const NewsletterEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content);

    const handleChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    const handleSave = () => {
        onUpdate(data);
        alert('Configurações de Newsletter atualizadas!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Newsletter</h1>
                <button className="btn-save" onClick={handleSave}>Salvar Alterações</button>
            </div>

            <div className="admin-card">
                <div className="editor-form">
                    <div className="form-group">
                        <label>Título da Seção</label>
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Placeholder do Campo</label>
                            <input
                                type="text"
                                value={data.placeholder}
                                onChange={(e) => handleChange('placeholder', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Texto do Botão</label>
                            <input
                                type="text"
                                value={data.button}
                                onChange={(e) => handleChange('button', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterEditor;
