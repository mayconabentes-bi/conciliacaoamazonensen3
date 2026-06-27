import React, { useState } from 'react';

const VeneraveisEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content || {
        tag: 'Patrimônio da Loja',
        title: 'Galeria Histórica dos Veneráveis Mestres',
        description: 'Registro permanente dos Irmãos que conduziram os trabalhos da Loja ao longo de sua história.',
        members: []
    });

    const handleItemChange = (index, field, value) => {
        const newItems = [...(data.members || [])];
        newItems[index] = { ...newItems[index], [field]: value };
        setData({ ...data, members: newItems });
    };

    const handleAdd = () => {
        setData({
            ...data,
            members: [...(data.members || []), { role: 'Venerável Mestre', name: 'Nome do Irmão', year: '', photo: '' }]
        });
    };

    const handleSave = async () => {
        try {
            await onUpdate(data);
            alert('Galeria Histórica dos Veneráveis Mestres atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar Veneráveis:', error);
            alert('Falha ao salvar a Galeria Histórica dos Veneráveis Mestres. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Galeria Histórica dos Veneráveis Mestres</h1>
                <button className="btn-save" onClick={handleSave}>Salvar Alterações</button>
            </div>

            <div className="admin-card">
                <div style={{ marginBottom: '24px', padding: '18px', border: '1px solid var(--admin-border)', borderRadius: '12px', background: 'rgba(212, 175, 55, 0.08)' }}>
                    <h2 style={{ margin: '0 0 12px', fontSize: '1.15rem', color: 'var(--admin-text)' }}>
                        Ações para você iniciar o carregamento
                    </h2>
                    <ol style={{ margin: 0, paddingLeft: '22px', color: 'var(--admin-muted)', lineHeight: 1.7 }}>
                        <li>Entrar no painel administrativo.</li>
                        <li>Acessar <strong>Galeria Veneráveis</strong>.</li>
                        <li>Clicar em <strong>Adicionar Irmão</strong>.</li>
                        <li>Preencher <strong>Cargo</strong>, <strong>Nome do Irmão</strong>, <strong>Ano/Período</strong> e <strong>URL/Caminho da Foto</strong>.</li>
                        <li>Usar caminhos como <code>/assets/veneraveis/nome_do_arquivo.jpg</code> ou uma URL pública de imagem.</li>
                        <li>Clicar em <strong>Salvar Alterações</strong>.</li>
                    </ol>
                </div>
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

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button className="btn-save" onClick={handleAdd} style={{ width: 'auto', padding: '12px 18px' }}>
                    Adicionar Irmão
                </button>
            </div>

            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {(data.members || []).map((member, index) => (
                    <div key={index} className="admin-card member-edit-card">
                        <div className="member-edit-header" style={{ marginBottom: '15px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '10px' }}>
                            <span className="badge" style={{ background: 'var(--admin-gold)', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {member.role}
                            </span>
                        </div>
                        <div className="editor-form">
                            <div className="form-group">
                                <label>Cargo</label>
                                <input
                                    type="text"
                                    value={member.role}
                                    onChange={(e) => handleItemChange(index, 'role', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nome do Irmão</label>
                                <input
                                    type="text"
                                    value={member.name}
                                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Ano/Período</label>
                                <input
                                    type="text"
                                    placeholder="Ex.: 2024, 2024–2025 ou 1998/1999"
                                    value={member.year || ''}
                                    onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>URL/Caminho da Foto</label>
                                <input
                                    type="text"
                                    placeholder="Ex.: /assets/veneraveis/irmao_nome.jpg"
                                    value={member.photo || ''}
                                    onChange={(e) => handleItemChange(index, 'photo', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VeneraveisEditor;
