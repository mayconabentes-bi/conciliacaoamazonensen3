import React, { useState } from 'react';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const NavEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content);

    const handleSave = () => {
        onUpdate(data);
        alert('Menu de navegação atualizado com sucesso!');
    };

    const updateLink = (linkIndex, field, value) => {
        const newLinks = [...data.links];
        newLinks[linkIndex] = { ...newLinks[linkIndex], [field]: value };
        setData({ ...data, links: newLinks });
    };

    const updateDropdownTitle = (linkIndex, dropIndex, value) => {
        const newLinks = [...data.links];
        const newDropdown = [...newLinks[linkIndex].dropdown];
        newDropdown[dropIndex] = { ...newDropdown[dropIndex], title: value };
        newLinks[linkIndex] = { ...newLinks[linkIndex], dropdown: newDropdown };
        setData({ ...data, links: newLinks });
    };

    const updateDropdownItem = (linkIndex, dropIndex, itemIndex, field, value) => {
        const newLinks = [...data.links];
        const newDropdown = [...newLinks[linkIndex].dropdown];
        const newItems = [...newDropdown[dropIndex].items];
        newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
        newDropdown[dropIndex] = { ...newDropdown[dropIndex], items: newItems };
        newLinks[linkIndex] = { ...newLinks[linkIndex], dropdown: newDropdown };
        setData({ ...data, links: newLinks });
    };

    const addDropDownItem = (linkIndex, dropIndex) => {
        const newLinks = [...data.links];
        const newDropdown = [...newLinks[linkIndex].dropdown];
        newDropdown[dropIndex].items.push({ label: 'Novo Item', href: '#' });
        newLinks[linkIndex] = { ...newLinks[linkIndex], dropdown: newDropdown };
        setData({ ...data, links: newLinks });
    };

    const removeDropDownItem = (linkIndex, dropIndex, itemIndex) => {
        const newLinks = [...data.links];
        const newDropdown = [...newLinks[linkIndex].dropdown];
        newDropdown[dropIndex].items.splice(itemIndex, 1);
        newLinks[linkIndex] = { ...newLinks[linkIndex], dropdown: newDropdown };
        setData({ ...data, links: newLinks });
    };

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Editar Navegação</h1>
                <button className="btn-save" onClick={handleSave}>
                    <Save size={18} /> Salvar Alterações
                </button>
            </div>

            <div className="admin-card">
                <h3>Barra de Aviso (Topo)</h3>
                <div className="editor-form" style={{ marginTop: '15px' }}>
                    <div className="form-group">
                        <label>Texto do Evento</label>
                        <input
                            type="text"
                            value={data.announce.text}
                            onChange={(e) => setData({ ...data, announce: { ...data.announce, text: e.target.value } })}
                        />
                    </div>
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div className="form-group">
                            <label>Data</label>
                            <input
                                type="text"
                                value={data.announce.date}
                                onChange={(e) => setData({ ...data, announce: { ...data.announce, date: e.target.value } })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Texto do Link</label>
                            <input
                                type="text"
                                value={data.announce.linkText}
                                onChange={(e) => setData({ ...data, announce: { ...data.announce, linkText: e.target.value } })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-card">
                <h3>Links do Menu Principal</h3>
                <p style={{ color: 'var(--admin-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                    Edite os links principais e seus menus suspensos (dropdowns).
                </p>

                {data.links.map((link, lIdx) => (
                    <div key={lIdx} className="nav-link-editor" style={{
                        border: '1px solid var(--admin-border)',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '20px',
                        background: 'rgba(255,255,255,0.02)'
                    }}>
                        <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '15px', marginBottom: link.dropdown ? '20px' : '0' }}>
                            <div className="form-group">
                                <label>Rótulo do Link</label>
                                <input
                                    type="text"
                                    value={link.label}
                                    onChange={(e) => updateLink(lIdx, 'label', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Destino (URL/#)</label>
                                <input
                                    type="text"
                                    value={link.href}
                                    onChange={(e) => updateLink(lIdx, 'href', e.target.value)}
                                />
                            </div>
                        </div>

                        {link.dropdown && (
                            <div className="dropdown-editor" style={{ paddingLeft: '20px', borderLeft: '2px solid var(--admin-gold)' }}>
                                <h4 style={{ fontSize: '0.9rem', color: 'var(--admin-gold)', marginBottom: '15px' }}>Menu Suspenso: {link.label}</h4>
                                {link.dropdown.map((drop, dIdx) => (
                                    <div key={dIdx} className="dropdown-section" style={{ marginBottom: '20px' }}>
                                        <div className="form-group">
                                            <label>Título da Seção</label>
                                            <input
                                                type="text"
                                                value={drop.title}
                                                onChange={(e) => updateDropdownTitle(lIdx, dIdx, e.target.value)}
                                                style={{ fontWeight: 'bold', borderColor: 'var(--admin-gold)' }}
                                            />
                                        </div>

                                        <div className="dropdown-items" style={{ marginTop: '10px' }}>
                                            {drop.items.map((item, iIdx) => (
                                                <div key={iIdx} className="form-row" style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 1fr 40px',
                                                    gap: '10px',
                                                    marginBottom: '10px',
                                                    alignItems: 'end'
                                                }}>
                                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                                        <input
                                                            type="text"
                                                            value={item.label}
                                                            onChange={(e) => updateDropdownItem(lIdx, dIdx, iIdx, 'label', e.target.value)}
                                                            placeholder="Texto"
                                                        />
                                                    </div>
                                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                                        <input
                                                            type="text"
                                                            value={item.href}
                                                            onChange={(e) => updateDropdownItem(lIdx, dIdx, iIdx, 'href', e.target.value)}
                                                            placeholder="Link"
                                                        />
                                                    </div>
                                                    <button
                                                        className="btn-danger"
                                                        onClick={() => removeDropDownItem(lIdx, dIdx, iIdx)}
                                                        style={{ background: 'rgba(255,0,0,0.1)', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', color: '#ff4444' }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                className="btn-add"
                                                onClick={() => addDropDownItem(lIdx, dIdx)}
                                                style={{ background: 'rgba(201,168,76,0.1)', border: '1px dashed var(--admin-gold)', color: 'var(--admin-gold)', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                                            >
                                                <Plus size={14} /> Adicionar Item
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="admin-card">
                <h3>Botão de Ação (Direita)</h3>
                <div className="editor-form" style={{ marginTop: '15px' }}>
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div className="form-group">
                            <label>Texto do Botão (Principal)</label>
                            <input
                                type="text"
                                value={data.actions.outline}
                                onChange={(e) => setData({ ...data, actions: { ...data.actions, outline: e.target.value } })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Link do Botão</label>
                            <input
                                type="text"
                                value={data.actions.outlineHref}
                                onChange={(e) => setData({ ...data, actions: { ...data.actions, outlineHref: e.target.value } })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default NavEditor;
