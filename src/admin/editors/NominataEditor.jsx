import React, { useState } from 'react';

const NominataEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content);

    const handleMemberChange = (index, field, value) => {
        const newMembers = [...data.members];
        newMembers[index] = { ...newMembers[index], [field]: value };
        setData({ ...data, members: newMembers });
    };

    const handleSave = () => {
        onUpdate(data);
        alert('Conteúdo da Nominata atualizado com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Nominata</h1>
                <button className="btn-save" onClick={handleSave}>Salvar Alterações</button>
            </div>

            <div className="admin-card">
                <div className="editor-form">
                    <div className="form-group">
                        <label>Título da Seção</label>
                        <input 
                            type="text" 
                            value={data.title} 
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Descrição</label>
                        <textarea 
                            value={data.description} 
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            rows={3}
                        />
                    </div>
                </div>
            </div>

            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {data.members.map((member, index) => (
                    <div key={index} className="admin-card member-edit-card">
                        <div className="member-edit-header" style={{ marginBottom: '15px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '10px' }}>
                            <span className="badge" style={{ background: 'var(--admin-gold)', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {member.role}
                            </span>
                        </div>
                        <div className="editor-form">
                            <div className="form-group">
                                <label>Nome do Irmão</label>
                                <input 
                                    type="text" 
                                    value={member.name} 
                                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>URL da Foto/Caminho</label>
                                <input 
                                    type="text" 
                                    value={member.photo} 
                                    onChange={(e) => handleMemberChange(index, 'photo', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NominataEditor;
