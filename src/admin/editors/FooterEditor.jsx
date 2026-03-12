import React, { useState } from 'react';

const FooterEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content);

    const handleChange = (section, field, value) => {
        setData({
            ...data,
            [section]: { ...data[section], [field]: value }
        });
    };

    const handleLinkChange = (colIndex, linkIndex, field, value) => {
        const newColumns = [...data.columns];
        newColumns[colIndex].links[linkIndex] = { ...newColumns[colIndex].links[linkIndex], [field]: value };
        setData({ ...data, columns: newColumns });
    };

    const handleSocialChange = (index, field, value) => {
        const newSocials = [...data.socials];
        newSocials[index] = { ...newSocials[index], [field]: value };
        setData({ ...data, socials: newSocials });
    };

    const handleSave = () => {
        onUpdate(data);
        alert('Conteúdo do Rodapé atualizado com sucesso!');
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Rodapé (Footer)</h1>
                <button className="btn-save" onClick={handleSave}>Salvar Alterações</button>
            </div>

            <div className="admin-card">
                <h3 className="section-title">Marca e Descrição</h3>
                <div className="editor-form">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Nome da Marca</label>
                            <input
                                type="text"
                                value={data.brand.name}
                                onChange={(e) => handleChange('brand', 'name', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Subtítulo (Localização)</label>
                            <input
                                type="text"
                                value={data.brand.sub}
                                onChange={(e) => handleChange('brand', 'sub', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Descrição Institucional</label>
                        <textarea
                            value={data.brand.description}
                            onChange={(e) => handleChange('brand', 'description', e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>
            </div>

            <div className="admin-card">
                <h3 className="section-title">Redes Sociais</h3>
                <div className="editor-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    {data.socials.map((social, index) => (
                        <div key={social.id} className="form-group">
                            <label>{social.title}</label>
                            <input
                                type="text"
                                value={social.href}
                                onChange={(e) => handleSocialChange(index, 'href', e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer-cols-editor" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                {data.columns.map((col, cIdx) => (
                    <div key={cIdx} className="admin-card">
                        <h3 className="section-title">Coluna: {col.title}</h3>
                        <div className="editor-form">
                            {col.links.map((link, lIdx) => (
                                <div key={lIdx} style={{ marginBottom: '10px', padding: '5px', borderBottom: '1px solid #eee' }}>
                                    <input
                                        type="text"
                                        value={link.label}
                                        style={{ marginBottom: '5px' }}
                                        onChange={(e) => handleLinkChange(cIdx, lIdx, 'label', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={link.href}
                                        style={{ fontSize: '0.8rem' }}
                                        onChange={(e) => handleLinkChange(cIdx, lIdx, 'href', e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin-card">
                <h3 className="section-title">Rodapé Inferior</h3>
                <div className="editor-form">
                    <div className="form-group">
                        <label>Copyright</label>
                        <input
                            type="text"
                            value={data.bottom.copy}
                            onChange={(e) => {
                                const newData = { ...data, bottom: { ...data.bottom, copy: e.target.value } };
                                setData(newData);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Lema (Motto)</label>
                        <input
                            type="text"
                            value={data.bottom.motto}
                            onChange={(e) => {
                                const newData = { ...data, bottom: { ...data.bottom, motto: e.target.value } };
                                setData(newData);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterEditor;
