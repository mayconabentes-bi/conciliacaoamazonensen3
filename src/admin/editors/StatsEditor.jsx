import React, { useState, useEffect } from 'react';
import { Plus, Trash2, BarChart3, Save } from 'lucide-react';

const StatsEditor = ({ content, onUpdate }) => {
    const [stats, setStats] = useState(content || []);

    useEffect(() => {
        if (content) {
            setStats(content);
        }
    }, [content]);

    const handleChange = (index, field, value) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setStats(newStats);
    };

    const addStat = () => {
        setStats([...stats, { num: '0', label: 'Nova Estatística' }]);
    };

    const removeStat = (index) => {
        const newStats = stats.filter((_, i) => i !== index);
        setStats(newStats);
    };

    const handleSave = () => {
        onUpdate(stats);
        alert('Estatísticas atualizadas com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <BarChart3 size={32} color="var(--admin-gold)" />
                    <h1>Editor: Estatísticas</h1>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-add" onClick={addStat}>
                        <Plus size={18} /> Adicionar Estatística
                    </button>
                    <button className="btn-save" onClick={handleSave}>
                        <Save size={18} /> Salvar Alterações
                    </button>
                </div>
            </div>

            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="admin-card" style={{ position: 'relative' }}>
                        <button 
                            className="btn-remove-stat" 
                            onClick={() => removeStat(index)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            title="Remover"
                        >
                            <Trash2 size={16} />
                        </button>
                        
                        <div className="editor-form">
                            <div className="form-group">
                                <label>Número/Valor (Destaque)</label>
                                <input
                                    type="text"
                                    value={stat.num}
                                    placeholder="Ex: +50, 3ª, ∞"
                                    onChange={(e) => handleChange(index, 'num', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Rótulo/Descrição</label>
                                <textarea
                                    value={stat.label}
                                    placeholder="Ex: Irmãos Regulares"
                                    onChange={(e) => handleChange(index, 'label', e.target.value)}
                                    rows={2}
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
