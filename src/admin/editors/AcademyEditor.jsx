import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

const AcademyEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content);

    const handleChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    const handleArticleChange = (index, field, value) => {
        const newArticles = [...data.articles];
        if (field === 'meta') {
            // Meta is an array [category, readTime]
            const [type, val] = (value || '').split('|');
            newArticles[index] = { ...newArticles[index], meta: [(type || '').trim(), (val || '').trim()] };
        } else {
            newArticles[index] = { ...newArticles[index], [field]: value };
        }
        setData({ ...data, articles: newArticles });
    };

    const addArticle = () => {
        const newArticle = {
            icon: 'Book',
            cat: 'Nova Categoria',
            title: 'Novo Artigo',
            excerpt: 'Resumo do novo artigo...',
            meta: ['Categoria', '10 min']
        };
        setData({ ...data, articles: [newArticle, ...data.articles] });
    };

    const removeArticle = (index) => {
        if (window.confirm('Deseja realmente excluir este artigo?')) {
            const newArticles = data.articles.filter((_, i) => i !== index);
            setData({ ...data, articles: newArticles });
        }
    };

    const handleSave = () => {
        onUpdate(data);
        alert('Conteúdo da Academia atualizado com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Academia Filosófica</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-save" onClick={addArticle} style={{ background: 'var(--admin-border)', color: 'white' }}>
                        <Plus size={18} /> Adicionar Artigo
                    </button>
                    <button className="btn-save" onClick={handleSave}>
                        <Save size={18} /> Salvar Alterações
                    </button>
                </div>
            </div>

            <div className="admin-card">
                <h3 className="section-title">Cabeçalho</h3>
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
                </div>
            </div>

            <div className="articles-editor-list">
                {data.articles.map((article, index) => (
                    <div key={index} className="admin-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 className="section-title" style={{ margin: 0 }}>Artigo {index + 1}: {article.title}</h3>
                            <button 
                                onClick={() => removeArticle(index)}
                                style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', border: '1px solid #e74c3c', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                                <Trash2 size={14} /> Excluir
                            </button>
                        </div>
                        <div className="editor-form">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label>Categoria (Badge)</label>
                                    <input
                                        type="text"
                                        value={article.cat}
                                        onChange={(e) => handleArticleChange(index, 'cat', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ícone/Símbolo</label>
                                    <input
                                        type="text"
                                        value={article.icon}
                                        onChange={(e) => handleArticleChange(index, 'icon', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label>Tipo de Acesso</label>
                                    <select 
                                        value={article.access || 'public'} 
                                        onChange={(e) => handleArticleChange(index, 'access', e.target.value)}
                                        style={{ width: '100%', padding: '10px', background: '#0d1117', border: '1px solid var(--admin-border)', color: 'white', borderRadius: '6px' }}
                                    >
                                        <option value="public">🔓 Público (Livre)</option>
                                        <option value="restricted">🔒 Restrito (Senha "semestral")</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Metadados (Categoria | Tempo Leitura)</label>
                                    <input
                                        type="text"
                                        value={article.meta.join(' | ')}
                                        onChange={(e) => handleArticleChange(index, 'meta', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Título do Artigo</label>
                                <input
                                    type="text"
                                    value={article.title}
                                    onChange={(e) => handleArticleChange(index, 'title', e.target.value)}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label>Imagem de Capa (URL)</label>
                                    <input
                                        type="text"
                                        value={article.image || ''}
                                        onChange={(e) => handleArticleChange(index, 'image', e.target.value)}
                                        placeholder="https://exemplo.com/imagem.jpg"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Vídeo do Artigo (Link YouTube/URL)</label>
                                    <input
                                        type="text"
                                        value={article.video || ''}
                                        onChange={(e) => handleArticleChange(index, 'video', e.target.value)}
                                        placeholder="https://youtube.com/watch?v=..."
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Resumo (Excerpt)</label>
                                <textarea
                                    value={article.excerpt}
                                    onChange={(e) => handleArticleChange(index, 'excerpt', e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcademyEditor;

