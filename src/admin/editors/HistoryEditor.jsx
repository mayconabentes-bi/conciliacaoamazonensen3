import React, { useState } from 'react';

const HistoryEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content);

    const handleChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    const handlePillarChange = (index, value) => {
        const newPillars = [...data.pillars];
        newPillars[index] = value;
        setData({ ...data, pillars: newPillars });
    };

    const handleTimelineChange = (index, field, value) => {
        const newTimeline = [...data.timeline];
        newTimeline[index] = { ...newTimeline[index], [field]: value };
        setData({ ...data, timeline: newTimeline });
    };

    const handleSave = () => {
        onUpdate(data);
        alert('Conteúdo de História atualizado com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Nossa História</h1>
                <button className="btn-save" onClick={handleSave}>Salvar Alterações</button>
            </div>

            <div className="admin-card">
                <h3 className="section-title">Textos Principais</h3>
                <div className="editor-form">
                    <div className="form-group">
                        <label>Tag (Badge)</label>
                        <input
                            type="text"
                            value={data.tag}
                            onChange={(e) => handleChange('tag', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Título da Seção</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Parágrafos da História</label>
                        {data.paragraphs && data.paragraphs.map((p, idx) => (
                            <div key={idx} style={{ marginBottom: '15px', position: 'relative' }}>
                                <textarea
                                    value={p}
                                    onChange={(e) => {
                                        const newP = [...data.paragraphs];
                                        newP[idx] = e.target.value;
                                        setData({ ...data, paragraphs: newP });
                                    }}
                                    rows={4}
                                />
                                <button
                                    onClick={() => {
                                        const newP = data.paragraphs.filter((_, i) => i !== idx);
                                        setData({ ...data, paragraphs: newP });
                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: '-10px',
                                        top: '-10px',
                                        background: '#ff4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        cursor: 'pointer',
                                        zIndex: 10
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button
                            className="btn-add"
                            onClick={() => setData({ ...data, paragraphs: [...(data.paragraphs || []), 'Novo parágrafo...'] })}
                            style={{ background: 'rgba(201,168,76,0.1)', border: '1px dashed var(--admin-gold)', color: 'var(--admin-gold)', padding: '10px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
                        >
                            + Adicionar Parágrafo
                        </button>
                    </div>
                </div>
            </div>

            <div className="admin-card">
                <h3 className="section-title">Pilares de Atuação</h3>
                <div className="editor-form">
                    {data.pillars.map((pillar, index) => (
                        <div key={index} className="form-group">
                            <label>Pilar {index + 1}</label>
                            <input
                                type="text"
                                value={pillar}
                                onChange={(e) => handlePillarChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="admin-card">
                <h3 className="section-title">Linha do Tempo (Timeline)</h3>
                <div className="timeline-editor">
                    {data.timeline.map((item, index) => (
                        <div key={index} className="timeline-item-form" style={{ marginBottom: '20px', padding: '15px', border: '1px solid var(--admin-border)', borderRadius: '8px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label>Ano/Março</label>
                                    <input
                                        type="text"
                                        value={item.year}
                                        onChange={(e) => handleTimelineChange(index, 'year', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Título do Evento</label>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Descrição</label>
                                <textarea
                                    value={item.desc}
                                    onChange={(e) => handleTimelineChange(index, 'desc', e.target.value)}
                                    rows={2}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HistoryEditor;
