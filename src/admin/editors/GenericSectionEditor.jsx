import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

const GenericSectionEditor = ({ content, onUpdate, title = "Editor de Seção" }) => {
    const [data, setData] = useState(content);

    const handleChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = [...data.sections];
        newSections[index] = { ...newSections[index], [field]: value };
        setData({ ...data, sections: newSections });
    };

    const addSection = () => {
        const newSection = {
            title: 'Nova Seção',
            content: 'Conteúdo da nova seção...'
        };
        setData({ ...data, sections: [...data.sections, newSection] });
    };

    const removeSection = (index) => {
        if (window.confirm('Deseja realmente excluir esta seção?')) {
            const newSections = data.sections.filter((_, i) => i !== index);
            setData({ ...data, sections: newSections });
        }
    };

    const handleSave = () => {
        onUpdate(data);
        alert('Conteúdo atualizado com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>{title}</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-save" onClick={addSection} style={{ background: 'var(--admin-border)', color: 'white' }}>
                        <Plus size={18} /> Adicionar Seção
                    </button>
                    <button className="btn-save" onClick={handleSave}>
                        <Save size={18} /> Salvar Alterações
                    </button>
                </div>
            </div>

            <div className="admin-card">
                <div className="editor-form">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Tag (Badge)</label>
                            <input
                                type="text"
                                value={data.tag}
                                onChange={(e) => handleChange('tag', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Título da Página</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Introdução/Resumo</label>
                        <textarea
                            value={data.intro}
                            onChange={(e) => handleChange('intro', e.target.value)}
                            rows={4}
                        />
                    </div>
                </div>
            </div>

            {data.sections.map((section, index) => (
                <div key={index} className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 className="section-title" style={{ margin: 0 }}>Seção {index + 1}: {section.title}</h3>
                        <button 
                            onClick={() => removeSection(index)}
                            style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', border: '1px solid #e74c3c', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                            <Trash2 size={14} /> Excluir
                        </button>
                    </div>
                    <div className="editor-form">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Título da Seção</label>
                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                                    style={{ fontWeight: '600', color: 'var(--admin-gold)' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Tipo de Acesso</label>
                                <select 
                                    value={section.access || 'public'} 
                                    onChange={(e) => handleSectionChange(index, 'access', e.target.value)}
                                    style={{ width: '100%', padding: '10px', background: '#0d1117', border: '1px solid var(--admin-border)', color: 'white', borderRadius: '6px' }}
                                >
                                    <option value="public">🔓 Público (Livre)</option>
                                    <option value="restricted">🔒 Restrito (Senha "semestral")</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Imagem (URL)</label>
                                <input
                                    type="text"
                                    value={section.image || ''}
                                    onChange={(e) => handleSectionChange(index, 'image', e.target.value)}
                                    placeholder="https://exemplo.com/imagem.jpg"
                                />
                            </div>
                            <div className="form-group">
                                <label>Vídeo (Link YouTube/URL)</label>
                                <input
                                    type="text"
                                    value={section.video || ''}
                                    onChange={(e) => handleSectionChange(index, 'video', e.target.value)}
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Conteúdo (Use duas quebras de linha para novos parágrafos)</label>
                            <textarea
                                value={section.content}
                                onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                                rows={8}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className="admin-card">
                <div className="editor-form">
                    <div className="form-group">
                        <label>Rodapé da Página (Footer)</label>
                        <input
                            type="text"
                            value={data.footer}
                            onChange={(e) => handleChange('footer', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenericSectionEditor;

