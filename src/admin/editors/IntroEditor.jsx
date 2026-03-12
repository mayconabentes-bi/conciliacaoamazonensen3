import React, { useState } from 'react';

const IntroEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content);

    const handleChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    const handleSectionChange = (idx, field, value) => {
        const newSections = [...data.sections];
        newSections[idx] = { ...newSections[idx], [field]: value };
        setData({ ...data, sections: newSections });
    };

    const handleBulletChange = (sIdx, bIdx, field, value) => {
        const newSections = [...data.sections];
        const newBullets = [...newSections[sIdx].bullets];
        newBullets[bIdx] = { ...newBullets[bIdx], [field]: value };
        newSections[sIdx] = { ...newSections[sIdx], bullets: newBullets };
        setData({ ...data, sections: newSections });
    };

    const handleSave = () => {
        onUpdate(data);
        alert('Conteúdo de Introdução atualizado com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Seção de Introdução</h1>
                <button className="btn-save" onClick={handleSave}>Salvar Alterações</button>
            </div>

            <div className="admin-card">
                <div className="editor-form">
                    <div className="form-group">
                        <label>Tag Superperior (Welcome)</label>
                        <input
                            type="text"
                            value={data.welcome}
                            onChange={(e) => handleChange('welcome', e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Título (Normal)</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Título (Destaque)</label>
                            <input
                                type="text"
                                value={data.emphasized}
                                onChange={(e) => handleChange('emphasized', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Citação (Highlight)</label>
                        <textarea
                            value={data.highlight}
                            onChange={(e) => handleChange('highlight', e.target.value)}
                            rows={3}
                        />
                    </div>

                    <h3 style={{ margin: '30px 0 15px', color: 'var(--admin-gold)' }}>Seções de Texto</h3>
                    {data.sections && data.sections.map((section, sIdx) => (
                        <div key={sIdx} className="admin-sub-card" style={{
                            border: '1px solid var(--admin-border)',
                            padding: '15px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            background: 'rgba(255,255,255,0.02)'
                        }}>
                            <div className="form-group">
                                <label>Título da Seção</label>
                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => handleSectionChange(sIdx, 'title', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Conteúdo da Seção</label>
                                <textarea
                                    value={section.content}
                                    onChange={(e) => handleSectionChange(sIdx, 'content', e.target.value)}
                                    rows={5}
                                />
                            </div>

                            {section.bullets && (
                                <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '15px', marginTop: '15px' }}>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Tópicos (Bullets)</label>
                                    {section.bullets.map((bullet, bIdx) => (
                                        <div key={bIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', marginTop: '10px' }}>
                                            <input
                                                type="text"
                                                value={bullet.title}
                                                onChange={(e) => handleBulletChange(sIdx, bIdx, 'title', e.target.value)}
                                                placeholder="Título"
                                            />
                                            <input
                                                type="text"
                                                value={bullet.text}
                                                onChange={(e) => handleBulletChange(sIdx, bIdx, 'text', e.target.value)}
                                                placeholder="Texto"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid var(--admin-border)', paddingTop: '20px' }}>
                        <div className="form-group">
                            <label>Texto Botão Primário</label>
                            <input
                                type="text"
                                value={data.btnPrimary}
                                onChange={(e) => handleChange('btnPrimary', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Texto Botão Fantasminha (Ghost)</label>
                            <input
                                type="text"
                                value={data.btnGhost}
                                onChange={(e) => handleChange('btnGhost', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroEditor;
