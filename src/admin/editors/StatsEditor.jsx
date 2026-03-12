import React, { useState } from 'react';

const StatsEditor = ({ content, onUpdate }) => {
    const [stats, setStats] = useState(content);

    const handleChange = (index, field, value) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setStats(newStats);
    };

    const handleSave = () => {
        onUpdate(stats);
        alert('Estatísticas atualizadas com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Estatísticas</h1>
                <button className="btn-save" onClick={handleSave}>Salvar Alterações</button>
            </div>

            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="admin-card">
                        <div className="editor-form">
                            <div className="form-group">
                                <label>Número/Valor (Destaque)</label>
                                <input
                                    type="text"
                                    value={stat.num}
                                    onChange={(e) => handleChange(index, 'num', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Rótulo/Descrição</label>
                                <input
                                    type="text"
                                    value={stat.label}
                                    onChange={(e) => handleChange(index, 'label', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsEditor;
