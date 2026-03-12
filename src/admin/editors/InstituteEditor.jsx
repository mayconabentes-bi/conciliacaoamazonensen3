import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

const InstituteEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content);

    const handleChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    const handleProjectChange = (index, field, value) => {
        const newProjects = [...data.projects];
        newProjects[index] = { ...newProjects[index], [field]: value };
        setData({ ...data, projects: newProjects });
    };

    const addProject = () => {
        const newProject = {
            icon: '🤝',
            title: 'Novo Projeto',
            desc: 'Descrição do novo projeto institucional...'
        };
        setData({ ...data, projects: [...data.projects, newProject] });
    };

    const removeProject = (index) => {
        if (window.confirm('Deseja realmente excluir este projeto?')) {
            const newProjects = data.projects.filter((_, i) => i !== index);
            setData({ ...data, projects: newProjects });
        }
    };

    const handleSave = () => {
        onUpdate(data);
        alert('Conteúdo do Instituto atualizado com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Instituto Social</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-save" onClick={addProject} style={{ background: 'var(--admin-border)', color: 'white' }}>
                        <Plus size={18} /> Adicionar Projeto
                    </button>
                    <button className="btn-save" onClick={handleSave}>
                        <Save size={18} /> Salvar Alterações
                    </button>
                </div>
            </div>

            <div className="admin-card">
                <h3 className="section-title">Textos de Cabeçalho</h3>
                <div className="editor-form">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
                    </div>
                    <div className="form-group">
                        <label>Citação (Quote)</label>
                        <textarea
                            value={data.quote}
                            onChange={(e) => handleChange('quote', e.target.value)}
                            rows={2}
                        />
                    </div>
                    <div className="form-group">
                        <label>Parágrafo 1</label>
                        <textarea
                            value={data.paragraph1}
                            onChange={(e) => handleChange('paragraph1', e.target.value)}
                            rows={3}
                        />
                    </div>
                    <div className="form-group">
                        <label>Parágrafo 2</label>
                        <textarea
                            value={data.paragraph2}
                            onChange={(e) => handleChange('paragraph2', e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>
            </div>

            <div className="projects-editor-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {data.projects.map((project, index) => (
                    <div key={index} className="admin-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 className="section-title" style={{ margin: 0 }}>Projeto {index + 1}: {project.title}</h3>
                            <button 
                                onClick={() => removeProject(index)}
                                style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', border: '1px solid #e74c3c', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                                <Trash2 size={14} /> Excluir
                            </button>
                        </div>
                        <div className="editor-form">
                            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label>Ícone</label>
                                    <input
                                        type="text"
                                        value={project.icon}
                                        onChange={(e) => handleProjectChange(index, 'icon', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Título do Projeto</label>
                                    <input
                                        type="text"
                                        value={project.title}
                                        onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Descrição Curta</label>
                                <textarea
                                    value={project.desc}
                                    onChange={(e) => handleProjectChange(index, 'desc', e.target.value)}
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

export default InstituteEditor;

