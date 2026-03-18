import React, { useState } from 'react';
import { Plus, Trash2, Save, Calendar, Clock, MapPin, Link as LinkIcon } from 'lucide-react';

const SessionsEditor = ({ content, onUpdate }) => {
    const [sessions, setSessions] = useState(content || []);

    // Synchronize local state when content prop changes (important for first load/migration)
    React.useEffect(() => {
        if (content && content.length > 0 && sessions.length === 0) {
            setSessions(content);
        }
    }, [content]);

    const handleUpdate = (index, field, value) => {
        console.log(`Updating session ${index}: ${field} = ${value}`);
        const newSessions = [...sessions];
        newSessions[index] = { ...newSessions[index], [field]: value };
        setSessions(newSessions);
    };

    const addSession = () => {
        const today = new Date().toISOString().split('T')[0];
        const newSession = {
            date: today,
            time: '20:00',
            title: 'Nova Sessão',
            location: 'Templo Nobre',
            link: '#historia'
        };
        setSessions([newSession, ...sessions]);
    };

    const removeSession = (index) => {
        console.log(`Removing session at index: ${index}`);
        const newSessions = sessions.filter((_, i) => i !== index);
        setSessions(newSessions);
    };

    const handleSave = () => {
        onUpdate(sessions);
        alert('Calendário de sessões atualizado com sucesso!');
    };

    // Sort sessions by date (future first in display usually, but here we show as they are)
    const sortedSessions = [...sessions].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Calendário de Sessões</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-save" onClick={addSession} style={{ background: 'var(--admin-border)', color: 'white' }}>
                        <Plus size={18} /> Adicionar Sessão
                    </button>
                    <button className="btn-save" onClick={handleSave}>
                        <Save size={18} /> Salvar Alterações
                    </button>
                </div>
            </div>

            <div className="admin-card">
                <p style={{ color: 'var(--admin-muted)', marginBottom: '10px' }}>
                    Gerencie as próximas sessões e eventos da loja. O site exibirá automaticamente a próxima sessão futura na barra de avisos superior.
                </p>
            </div>

            <div className="sessions-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {sessions.length === 0 && (
                    <div className="admin-card" style={{ textAlign: 'center', padding: '40px' }}>
                        <Calendar size={48} style={{ opacity: 0.2, marginBottom: '10px' }} />
                        <p>Nenhuma sessão cadastrada.</p>
                    </div>
                )}
                
                {sessions.map((session, index) => (
                    <div key={index} className="admin-card session-item-editor">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ 
                                    background: 'var(--admin-gold)', 
                                    color: 'black', 
                                    padding: '8px', 
                                    borderRadius: '8px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center' 
                                }}>
                                    <Calendar size={20} />
                                </div>
                                <h3 style={{ margin: 0 }}>{session.title || 'Sessão sem título'}</h3>
                            </div>
                            <button 
                                onClick={() => removeSession(index)}
                                style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', border: '1px solid #e74c3c', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                                <Trash2 size={14} /> Excluir
                            </button>
                        </div>

                        <div className="editor-form">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label><Calendar size={14} style={{ marginRight: '5px' }} /> Data</label>
                                    <input
                                        type="date"
                                        value={session.date}
                                        onChange={(e) => handleUpdate(index, 'date', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><Clock size={14} style={{ marginRight: '5px' }} /> Horário</label>
                                    <input
                                        type="time"
                                        value={session.time}
                                        onChange={(e) => handleUpdate(index, 'time', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Título da Sessão / Evento</label>
                                <input
                                    type="text"
                                    value={session.title}
                                    onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                                    placeholder="Ex: Sessão Ordinária - Grau de Aprendiz"
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label><MapPin size={14} style={{ marginRight: '5px' }} /> Localização</label>
                                    <input
                                        type="text"
                                        value={session.location}
                                        onChange={(e) => handleUpdate(index, 'location', e.target.value)}
                                        placeholder="Ex: Templo Nobre"
                                    />
                                </div>
                                <div className="form-group">
                                    <label><LinkIcon size={14} style={{ marginRight: '5px' }} /> Link Relacionado (Opcional)</label>
                                    <input
                                        type="text"
                                        value={session.link}
                                        onChange={(e) => handleUpdate(index, 'link', e.target.value)}
                                        placeholder="#historia"
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

export default SessionsEditor;
