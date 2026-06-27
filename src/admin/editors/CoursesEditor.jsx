import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

const CoursesEditor = ({ content = [], onUpdate }) => {
    const [items, setItems] = useState(content || []);

    const handleItemChange = (index, field, value) => {
        const nextItems = [...items];
        if (field === 'grau') {
            nextItems[index] = { ...nextItems[index], grau: Number(value) };
        } else if (field === 'meta') {
            nextItems[index] = { ...nextItems[index], meta: value.split('|').map((item) => item.trim()).filter(Boolean) };
        } else {
            nextItems[index] = { ...nextItems[index], [field]: value };
        }
        setItems(nextItems);
    };

    const handleAdd = () => {
        setItems([
            {
                title: 'Novo Curso',
                cat: 'Cursos',
                excerpt: 'Resumo do curso...',
                grau: 1,
                totalLessons: 0,
                completedLessons: 0,
                duration: '0h total',
                instructor: 'Instrutor responsável',
                meta: ['0 aulas', '0 horas']
            },
            ...items
        ]);
    };

    const handleRemove = (index) => {
        if (window.confirm('Deseja realmente excluir este curso?')) {
            setItems(items.filter((_, itemIndex) => itemIndex !== index));
        }
    };

    const handleSave = () => {
        onUpdate(items);
        alert('Cursos atualizados com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Cursos da Academia</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-save" onClick={handleAdd} style={{ background: 'var(--admin-border)', color: 'white' }}>
                        <Plus size={18} /> Adicionar Curso
                    </button>
                    <button className="btn-save" onClick={handleSave}>
                        <Save size={18} /> Salvar Alterações
                    </button>
                </div>
            </div>

            {items.map((course, index) => (
                <div key={index} className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 className="section-title" style={{ margin: 0 }}>Curso {index + 1}: {course.title}</h3>
                        <button
                            onClick={() => handleRemove(index)}
                            style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', border: '1px solid #e74c3c', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                            <Trash2 size={14} /> Excluir
                        </button>
                    </div>

                    <div className="editor-form">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Título do Curso</label>
                                <input type="text" value={course.title || ''} onChange={(e) => handleItemChange(index, 'title', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Instrutor</label>
                                <input type="text" value={course.instructor || ''} onChange={(e) => handleItemChange(index, 'instructor', e.target.value)} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Grau</label>
                                <select value={course.grau || 1} onChange={(e) => handleItemChange(index, 'grau', e.target.value)} style={{ width: '100%', padding: '10px', background: '#0d1117', border: '1px solid var(--admin-border)', color: 'white', borderRadius: '6px' }}>
                                    <option value="1">1º Grau</option>
                                    <option value="2">2º Grau</option>
                                    <option value="3">3º Grau</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Duração</label>
                                <input type="text" value={course.duration || ''} onChange={(e) => handleItemChange(index, 'duration', e.target.value)} placeholder="Ex.: 6h total" />
                            </div>
                            <div className="form-group">
                                <label>Metadados</label>
                                <input type="text" value={(course.meta || []).join(' | ')} onChange={(e) => handleItemChange(index, 'meta', e.target.value)} placeholder="Ex.: 12 aulas | 6 horas" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Resumo</label>
                            <textarea value={course.excerpt || ''} onChange={(e) => handleItemChange(index, 'excerpt', e.target.value)} rows={4} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoursesEditor;
