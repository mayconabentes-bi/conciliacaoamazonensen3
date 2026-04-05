import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Users, Briefcase, Eye, ShieldCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const BusinessClubEditor = () => {
    const [activeTab, setActiveTab] = useState('jobs');
    const [jobs, setJobs] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingJob, setEditingJob] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: jobsData, error: jobsErr } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
            const { data: resumesData, error: resumesErr } = await supabase.from('resumes').select('*').order('created_at', { ascending: false });
            
            if (jobsErr) throw jobsErr;
            if (resumesErr) throw resumesErr;

            setJobs(jobsData || []);
            setResumes(resumesData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Erro ao carregar dados do Supabase. Verifique a conexão.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveJob = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const jobData = Object.fromEntries(formData.entries());

        try {
            if (editingJob?.id) {
                const { error } = await supabase.from('jobs').update(jobData).eq('id', editingJob.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('jobs').insert([jobData]);
                if (error) throw error;
            }
            setEditingJob(null);
            fetchData();
        } catch (error) {
            alert('Erro ao salvar vaga: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteJob = async (id) => {
        if (window.confirm('Excluir esta vaga permanentemente?')) {
            await supabase.from('jobs').delete().eq('id', id);
            fetchData();
        }
    };

    const handleToggleResumePublic = async (resume) => {
        try {
            const { error } = await supabase.from('resumes').update({ is_public: !resume.is_public }).eq('id', resume.id);
            if (error) throw error;
            fetchData();
        } catch (error) {
            alert('Erro ao alterar visibilidade: ' + error.message);
        }
    };

    const handleDeleteResume = async (id) => {
        if (window.confirm('Excluir este currículo permanentemente?')) {
            try {
                const { error } = await supabase.from('resumes').delete().eq('id', id);
                if (error) throw error;
                fetchData();
            } catch (error) {
                alert('Erro ao excluir currículo: ' + error.message);
            }
        }
    };

    const [editingResume, setEditingResume] = useState(null);

    const handleSaveResume = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const resumeData = Object.fromEntries(formData.entries());
        
        // Handle skills (comma-separated string to array)
        if (resumeData.skills) {
            resumeData.skills = resumeData.skills.split(',').map(s => s.trim()).filter(s => s);
        } else {
            resumeData.skills = [];
        }

        try {
            if (editingResume?.id) {
                const { error } = await supabase.from('resumes').update(resumeData).eq('id', editingResume.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('resumes').insert([resumeData]);
                if (error) throw error;
            }
            setEditingResume(null);
            fetchData();
        } catch (error) {
            alert('Erro ao salvar currículo: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Painel: Espaço de Integração e Ofício</h1>
                <div className="bc-admin-tabs" style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        className={`btn-save ${activeTab === 'jobs' ? '' : 'ghost'}`} 
                        onClick={() => setActiveTab('jobs')}
                        style={{ background: activeTab === 'jobs' ? 'var(--gold)' : 'transparent' }}
                    >
                        <Briefcase size={18} /> Vagas
                    </button>
                    <button 
                        className={`btn-save ${activeTab === 'resumes' ? '' : 'ghost'}`} 
                        onClick={() => setActiveTab('resumes')}
                        style={{ background: activeTab === 'resumes' ? 'var(--gold)' : 'transparent' }}
                    >
                        <Users size={18} /> Currículos
                    </button>
                    {activeTab === 'jobs' && (
                        <button className="btn-save" onClick={() => setEditingJob({})} style={{ background: 'var(--admin-border)' }}>
                            <Plus size={18} /> Nova Vaga
                        </button>
                    )}
                </div>
            </div>

            {activeTab === 'jobs' && (
                <div className="admin-content">
                    {editingJob ? (
                        <div className="admin-card">
                            <h3>{editingJob.id ? 'Editar Vaga' : 'Nova Vaga'}</h3>
                            <form onSubmit={handleSaveJob} className="editor-form">
                                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <div className="form-group">
                                        <label>Título da Vaga</label>
                                        <input name="title" defaultValue={editingJob.title} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Empresa</label>
                                        <input name="company" defaultValue={editingJob.company} required />
                                    </div>
                                </div>
                                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <div className="form-group">
                                        <label>Localização</label>
                                        <input name="location" defaultValue={editingJob.location} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Tipo (Ex: Presencial, Remoto)</label>
                                        <input name="type" defaultValue={editingJob.type} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Salário (Opcional)</label>
                                        <input name="salary" defaultValue={editingJob.salary} />
                                    </div>
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label>Descrição</label>
                                    <textarea name="description" defaultValue={editingJob.description} rows={4} required />
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label>Requisitos (Opcional)</label>
                                    <textarea name="requirements" defaultValue={editingJob.requirements} rows={3} placeholder="Ex: Formação superior, Inglês fluente..." />
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" className="btn-save" disabled={loading}><Save size={18} /> {loading ? 'Salvando...' : 'Salvar'}</button>
                                    <button type="button" className="btn-save ghost" onClick={() => setEditingJob(null)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="admin-card">
                            {loading && !jobs.length ? <p>Carregando vagas...</p> : (
                                <div className="table-responsive">
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--admin-border)' }}>
                                                <th style={{ padding: '15px' }}>Vaga</th>
                                                <th style={{ padding: '15px' }}>Empresa</th>
                                                <th style={{ padding: '15px' }}>Local</th>
                                                <th style={{ padding: '15px' }}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {jobs.length === 0 ? (
                                                <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>Nenhuma vaga cadastrada.</td></tr>
                                            ) : jobs.map(job => (
                                                <tr key={job.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <td style={{ padding: '15px' }}>{job.title}</td>
                                                    <td style={{ padding: '15px' }}>{job.company}</td>
                                                    <td style={{ padding: '15px' }}>{job.location}</td>
                                                    <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                                                        <button onClick={() => setEditingJob(job)} className="action-btn-mini"><Eye size={16} /></button>
                                                        <button onClick={() => handleDeleteJob(job.id)} className="action-btn-mini delete" disabled={loading}><Trash2 size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'resumes' && (
                <div className="admin-content">
                    {editingResume ? (
                        <div className="admin-card">
                            <h3>{editingResume.id ? 'Editar Talento' : 'Novo Talento'}</h3>
                            <form onSubmit={handleSaveResume} className="editor-form">
                                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <div className="form-group">
                                        <label>Nome Completo</label>
                                        <input name="full_name" defaultValue={editingResume.full_name} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Cargo / Especialidade</label>
                                        <input name="role" defaultValue={editingResume.role} required />
                                    </div>
                                </div>
                                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <div className="form-group">
                                        <label>E-mail de Contato</label>
                                        <input type="email" name="contact_email" defaultValue={editingResume.contact_email} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Anos de Experiência</label>
                                        <input type="number" name="experience_years" defaultValue={editingResume.experience_years} required />
                                    </div>
                                    <div className="form-group">
                                        <label>LinkedIn (URL)</label>
                                        <input name="linkedin_url" defaultValue={editingResume.linkedin_url} placeholder="https://linkedin.com/in/..." />
                                    </div>
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label>Habilidades (Tags separadas por vírgula)</label>
                                    <input name="skills" defaultValue={editingResume.skills ? editingResume.skills.join(', ') : ''} placeholder="Ex: React, Node.js, Gestão..." required />
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label>Resumo Profissional (Bio)</label>
                                    <textarea name="bio" defaultValue={editingResume.bio} rows={4} required />
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" className="btn-save" disabled={loading}><Save size={18} /> {loading ? 'Salvando...' : 'Salvar'}</button>
                                    <button type="button" className="btn-save ghost" onClick={() => setEditingResume(null)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="admin-card">
                            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="btn-save" onClick={() => setEditingResume({})} style={{ background: 'var(--admin-border)' }}>
                                    <Plus size={18} /> Novo Talento
                                </button>
                            </div>
                            <div className="table-responsive">
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--admin-border)' }}>
                                            <th style={{ padding: '15px' }}>Foto</th>
                                            <th style={{ padding: '15px' }}>Nome</th>
                                            <th style={{ padding: '15px' }}>Vínculo</th>
                                            <th style={{ padding: '15px' }}>Cargo</th>
                                            <th style={{ padding: '15px' }}>Status</th>
                                            <th style={{ padding: '15px' }}>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resumes.length === 0 ? (
                                            <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center' }}>Nenhum currículo cadastrado.</td></tr>
                                        ) : resumes.map(resume => (
                                            <tr key={resume.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '15px' }}>
                                                    {resume.photo_url ? (
                                                        <img src={resume.photo_url} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Users size={16} />
                                                        </div>
                                                    )}
                                                </td>
                                                <td style={{ padding: '15px' }}>{resume.full_name}</td>
                                                <td style={{ padding: '15px' }}>
                                                    <span style={{ fontSize: '0.7rem', background: 'rgba(201,168,76,0.1)', color: 'var(--gold)', padding: '2px 8px', borderRadius: '4px' }}>
                                                        {resume.relationship || 'N/A'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '15px' }}>{resume.role}</td>
                                                <td style={{ padding: '15px' }}>
                                                    <span className={`badge ${resume.is_public ? 'gold' : 'gray'}`}>
                                                        {resume.is_public ? 'Público' : 'Privado'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                                                    <button onClick={() => setEditingResume(resume)} className="action-btn-mini" title="Editar"><Eye size={16} /></button>
                                                    <button onClick={() => handleToggleResumePublic(resume)} className="action-btn-mini" title="Alternar Visibilidade">
                                                        <ShieldCheck size={16} color={resume.is_public ? 'var(--gold)' : '#666'} />
                                                    </button>
                                                    <button onClick={() => handleDeleteResume(resume.id)} className="action-btn-mini delete" title="Excluir"><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BusinessClubEditor;
