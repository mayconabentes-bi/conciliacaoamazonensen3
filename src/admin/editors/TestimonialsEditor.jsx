import React, { useState } from 'react';

const TestimonialsEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content);

    const handleChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    const handleTestimonialChange = (index, field, value) => {
        const newList = [...data.list];
        newList[index] = { ...newList[index], [field]: value };
        setData({ ...data, list: newList });
    };

    const handleApprove = (index) => {
        const testimonial = data.pending[index];
        const newList = [...data.list, testimonial];
        const newPending = data.pending.filter((_, i) => i !== index);
        
        const newData = { ...data, list: newList, pending: newPending };
        setData(newData);
        onUpdate(newData);
        alert('Depoimento aprovado e publicado!');
    };

    const handleReject = (index) => {
        if (window.confirm('Deseja realmente excluir este depoimento pendente?')) {
            const newPending = data.pending.filter((_, i) => i !== index);
            const newData = { ...data, pending: newPending };
            setData(newData);
            onUpdate(newData);
        }
    };

    const handleSave = () => {
        onUpdate(data);
        alert('Configurações de depoimentos atualizadas com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Depoimentos</h1>
                <button className="btn-save" onClick={handleSave}>Salvar Configurações</button>
            </div>

            <div className="admin-card">
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
                        <label>Descrição</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            rows={2}
                        />
                    </div>
                </div>
            </div>

            {data.pending && data.pending.length > 0 && (
                <div className="pending-section">
                    <h2 style={{ margin: '2rem 0 1rem', color: '#e67e22' }}>Pendentes de Aprovação ({data.pending.length})</h2>
                    <div className="testimonials-list">
                        {data.pending.map((testimonial, index) => (
                            <div key={`pending-${index}`} className="admin-card" style={{ borderLeft: '4px solid #e67e22' }}>
                                <div className="editor-form">
                                    <div className="form-group">
                                        <label>Texto do Depoimento</label>
                                        <p style={{ background: '#f9f9f9', padding: '1rem', fontStyle: 'italic' }}>"{testimonial.text}"</p>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'end' }}>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label>Autor</label>
                                            <input type="text" value={testimonial.author} readOnly />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label>Loja/Info</label>
                                            <input type="text" value={testimonial.info} readOnly />
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button 
                                                onClick={() => handleApprove(index)}
                                                style={{ padding: '10px', background: '#2ecc71', color: 'white', border: 'none', cursor: 'pointer', flex: 1 }}
                                            >
                                                Aprovar
                                            </button>
                                            <button 
                                                onClick={() => handleReject(index)}
                                                style={{ padding: '10px', background: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer', flex: 1 }}
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h2 style={{ margin: '2rem 0 1rem' }}>Depoimentos Publicados</h2>
            <div className="testimonials-list">
                {data.list.map((testimonial, index) => (
                    <div key={index} className="admin-card">
                        <div className="editor-form">
                            <div className="form-group">
                                <label>Texto do Depoimento {index + 1}</label>
                                <textarea
                                    value={testimonial.text}
                                    onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)}
                                    rows={4}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 60px', gap: '20px' }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label>Autor</label>
                                    <input
                                        type="text"
                                        value={testimonial.author}
                                        onChange={(e) => handleTestimonialChange(index, 'author', e.target.value)}
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label>Informação (Cargo/Tempo)</label>
                                    <input
                                        type="text"
                                        value={testimonial.info}
                                        onChange={(e) => handleTestimonialChange(index, 'info', e.target.value)}
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label>Inicial</label>
                                    <input
                                        type="text"
                                        value={testimonial.initial}
                                        onChange={(e) => handleTestimonialChange(index, 'initial', e.target.value)}
                                        maxLength={1}
                                        style={{ textAlign: 'center' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsEditor;
