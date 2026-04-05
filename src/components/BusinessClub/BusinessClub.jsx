import React, { useState, useEffect } from 'react';
import { Briefcase, UserPlus, Users, Search, MapPin, DollarSign, ExternalLink, Mail, Linkedin, Award, User, X, CheckCircle, Phone, Send, Shield, Globe } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import './BusinessClub.css';

const BusinessClub = ({ content }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('vagas');
    const [jobs, setJobs] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationSent, setApplicationSent] = useState(false);
    const [appForm, setAppForm] = useState({
        applicant_name: '',
        applicant_email: '',
        applicant_phone: '',
        cover_message: '',
        relationship: '',
        lodge_name: '',
        mason_name: ''
    });
    const [isMasonicApplicant, setIsMasonicApplicant] = useState(null);
    const [formData, setFormData] = useState({
        full_name: '',
        role: '',
        experience_years: '',
        bio: '',
        skills: '',
        contact_email: '',
        linkedin_url: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: jobsData } = await supabase
                .from('jobs')
                .select('*')
                .order('created_at', { ascending: false });
            
            const { data: resumesData } = await supabase
                .from('resumes')
                .select('*')
                .eq('is_public', true)
                .order('created_at', { ascending: false });

            setJobs(jobsData || []);
            setResumes(resumesData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitResume = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
            const { error } = await supabase.from('resumes').insert([{
                ...formData,
                skills: skillsArray,
                experience_years: parseInt(formData.experience_years) || 0,
                is_public: true // For now, making it public directly as requested for research/demo
            }]);

            if (error) throw error;

            alert('Currículo cadastrado com sucesso!');
            setFormData({
                full_name: '',
                role: '',
                experience_years: '',
                bio: '',
                skills: '',
                contact_email: '',
                linkedin_url: ''
            });
            fetchData();
            setActiveTab('talentos');
        } catch (error) {
            alert('Erro ao cadastrar currículo: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleApply = (job) => {
        setSelectedJob(job);
        setApplicationSent(false);
        setAppForm({ applicant_name: '', applicant_email: '', applicant_phone: '', cover_message: '', relationship: '', lodge_name: '', mason_name: '' });
        setIsMasonicApplicant(null);
    };

    const closeModal = () => {
        setSelectedJob(null);
        setApplicationSent(false);
    };

    const handleAppFormChange = (e) => {
        const { name, value } = e.target;
        setAppForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { error } = await supabase.from('job_applications').insert([{
                job_id: selectedJob.id,
                job_title: selectedJob.title,
                company: selectedJob.company,
                applicant_name: appForm.applicant_name,
                applicant_email: appForm.applicant_email,
                applicant_phone: appForm.applicant_phone,
                cover_message: appForm.cover_message,
                relationship: isMasonicApplicant ? appForm.relationship : 'Comunidade Externa',
                lodge_name: isMasonicApplicant ? appForm.lodge_name : null,
                mason_name: isMasonicApplicant ? appForm.mason_name : null
            }]);
            if (error) throw error;
            setApplicationSent(true);
        } catch (error) {
            alert('Erro ao enviar candidatura: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="business-club">
            <div className="container">
                <header className="bc-header reveal">
                    <div className="gold-line"><span>Clube de Negócios</span></div>
                    <h1>Conexão e Oportunidades<br /><em>no Oriente de Manaus</em></h1>
                    <p>Um espaço dedicado ao fortalecimento profissional e econômico de nossa comunidade, promovendo o auxílio mútuo e a prosperidade.</p>
                </header>

                <div className="bc-tabs reveal reveal-delay-1">
                    <button 
                        className={activeTab === 'vagas' ? 'active' : ''} 
                        onClick={() => setActiveTab('vagas')}
                    >
                        <Briefcase size={18} /> Banco de Vagas
                    </button>
                    <button 
                        className={activeTab === 'talentos' ? 'active' : ''} 
                        onClick={() => setActiveTab('talentos')}
                    >
                        <Users size={18} /> Banco de Talentos
                    </button>
                    <button 
                        className={activeTab === 'cadastro' ? 'active' : ''} 
                        onClick={() => navigate('/clube-negocios/cadastro')}
                    >
                        <UserPlus size={18} /> Cadastrar Currículo
                    </button>
                </div>

                <div className="bc-content">
                    {activeTab === 'vagas' && (
                        <div className="jobs-section">
                            {loading ? (
                                <div className="loading">Carregando vagas...</div>
                            ) : jobs.length > 0 ? (
                                <div className="jobs-grid">
                                    {jobs.map(job => (
                                        <div key={job.id} className="job-card">
                                            <div className="job-badge">{job.type}</div>
                                            <h3>{job.title}</h3>
                                            <p className="company">{job.company}</p>
                                            <div className="job-meta">
                                                <span><MapPin size={14} /> {job.location}</span>
                                                {job.salary && <span><DollarSign size={14} /> {job.salary}</span>}
                                            </div>
                                            <p className="description">{job.description}</p>
                                            <button className="btn-apply" onClick={() => handleApply(job)}>Candidatar-se</button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <Search size={48} />
                                    <p>Nenhuma vaga disponível no momento.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'talentos' && (
                        <div className="talents-section">
                            {loading ? (
                                <div className="loading">Carregando talentos...</div>
                            ) : resumes.length > 0 ? (
                                <div className="talents-grid">
                                    {resumes.map(resume => (
                                        <div key={resume.id} className="talent-card">
                                            <div className="talent-info">
                                                {resume.photo_url ? (
                                                    <div className="talent-avatar p-0">
                                                        <img src={resume.photo_url} alt={resume.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                                    </div>
                                                ) : (
                                                    <div className="talent-avatar">{resume.full_name.charAt(0)}</div>
                                                )}
                                                <div>
                                                    <div className="talent-header-row">
                                                        <h3>{resume.full_name}</h3>
                                                        {resume.relationship && <span className="relationship-tag">{resume.relationship}</span>}
                                                    </div>
                                                    <p className="role">{resume.role}</p>
                                                </div>
                                            </div>
                                            <div className="experience">
                                                <Award size={14} /> {resume.experience_years} anos de experiência
                                            </div>
                                            <p className="bio">{resume.bio}</p>
                                            <div className="skills">
                                                {resume.skills?.map((skill, i) => (
                                                    <span key={i} className="skill-tag">{skill}</span>
                                                ))}
                                            </div>
                                            <div className="talent-actions">
                                                <a href={`mailto:${resume.contact_email}`} className="action-link"><Mail size={16} /> Contato</a>
                                                {resume.linkedin_url && (
                                                    <a href={resume.linkedin_url} target="_blank" rel="noopener noreferrer" className="action-link">
                                                        <Linkedin size={16} /> LinkedIn
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <Users size={48} />
                                    <p>Ainda não há talentos cadastrados no banco.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'cadastro' && (
                        <div className="cadastro-section reveal">
                            <div className="form-container">
                                <h3>Cadastro Profissional</h3>
                                <p>Preencha os dados abaixo para integrar nosso Banco de Talentos.</p>
                                <form onSubmit={handleSubmitResume}>
                                    <div className="form-row">
                                        <div className="field">
                                            <label>Nome Completo</label>
                                            <input type="text" name="full_name" value={formData.full_name} onChange={handleInputChange} required />
                                        </div>
                                        <div className="field">
                                            <label>Cargo / Especialidade</label>
                                            <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Ex: Engenheiro Civil, Advogado..." required />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="field">
                                            <label>Anos de Experiência</label>
                                            <input type="number" name="experience_years" value={formData.experience_years} onChange={handleInputChange} required />
                                        </div>
                                        <div className="field">
                                            <label>E-mail de Contato</label>
                                            <input type="email" name="contact_email" value={formData.contact_email} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>Habilidades (separadas por vírgula)</label>
                                        <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} placeholder="Ex: Gestão, Vendas, AutoCAD..." required />
                                    </div>
                                    <div className="field">
                                        <label>Resumo Profissional</label>
                                        <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} required></textarea>
                                    </div>
                                    <div className="field">
                                        <label>LinkedIn URL (opcional)</label>
                                        <input type="url" name="linkedin_url" value={formData.linkedin_url} onChange={handleInputChange} placeholder="https://linkedin.com/in/..." />
                                    </div>
                                    <button type="submit" className="btn-gold" disabled={submitting}>
                                        {submitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Candidatura */}
            {selectedJob && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}><X size={20} /></button>
                        
                        {applicationSent ? (
                            <div className="application-success">
                                <CheckCircle size={64} />
                                <h3>Candidatura Enviada!</h3>
                                <p>Sua candidatura para <strong>{selectedJob.title}</strong> em <strong>{selectedJob.company}</strong> foi registrada com sucesso.</p>
                                <p className="success-sub">A empresa entrará em contato através do e-mail informado.</p>
                                <button className="btn-gold" onClick={closeModal}>Fechar</button>
                            </div>
                        ) : (
                            <>
                                <div className="modal-header">
                                    <div className="modal-job-badge">{selectedJob.type}</div>
                                    <h3>{selectedJob.title}</h3>
                                    <p className="modal-company">{selectedJob.company} — {selectedJob.location}</p>
                                </div>
                                <form onSubmit={handleSubmitApplication} className="modal-form">
                                    <div className="field">
                                        <label><User size={14} /> Nome Completo</label>
                                        <input type="text" name="applicant_name" value={appForm.applicant_name} onChange={handleAppFormChange} placeholder="Seu nome completo" required />
                                    </div>
                                    <div className="form-row">
                                        <div className="field">
                                            <label><Mail size={14} /> E-mail</label>
                                            <input type="email" name="applicant_email" value={appForm.applicant_email} onChange={handleAppFormChange} placeholder="seu@email.com" required />
                                        </div>
                                        <div className="field">
                                            <label><Phone size={14} /> Telefone</label>
                                            <input type="tel" name="applicant_phone" value={appForm.applicant_phone} onChange={handleAppFormChange} placeholder="(92) 99999-9999" />
                                        </div>
                                    </div>

                                    <div className="masonic-toggle">
                                        <label className="toggle-label">Vínculo com a Maçonaria</label>
                                        <div className="toggle-cards">
                                            <div 
                                                className={`toggle-card ${isMasonicApplicant === true ? 'active' : ''}`}
                                                onClick={() => setIsMasonicApplicant(true)}
                                            >
                                                <Shield size={24} />
                                                <span>Membro ou Parente</span>
                                            </div>
                                            <div 
                                                className={`toggle-card ${isMasonicApplicant === false ? 'active' : ''}`}
                                                onClick={() => { 
                                                    setIsMasonicApplicant(false); 
                                                    setAppForm(prev => ({ ...prev, relationship: '', lodge_name: '', mason_name: '' })); 
                                                }}
                                            >
                                                <Globe size={24} />
                                                <span>Público Geral</span>
                                            </div>
                                        </div>
                                    </div>

                                    {isMasonicApplicant === true && (
                                        <div className="masonic-fields" style={{ animation: 'slideDown 0.4s ease' }}>
                                            <div className="field">
                                                <label>Vínculo Maçônico</label>
                                                <select name="relationship" value={appForm.relationship} onChange={handleAppFormChange} required>
                                                    <option value="">Selecione seu vínculo...</option>
                                                    <option value="Irmão (Membro Regular)">Irmão (Membro Regular)</option>
                                                    <option value="Cunhada (Esposa/Viúva de Maçom)">Cunhada (Esposa/Viúva de Maçom)</option>
                                                    <option value="Sobrinha (Filha de Maçom)">Sobrinha (Filha de Maçom)</option>
                                                    <option value="Sobrinho (Filho de Maçom)">Sobrinho (Filho de Maçom)</option>
                                                    <option value="Baixa (Parente de Maçom)">Baixa (Parente de Maçom)</option>
                                                    <option value="Comunidade Maçônica">Comunidade Maçônica</option>
                                                    <option value="Outro">Outro</option>
                                                </select>
                                            </div>
                                            <div className="form-row">
                                                <div className="field">
                                                    <label>Nome da Loja Maçônica</label>
                                                    <input type="text" name="lodge_name" value={appForm.lodge_name} onChange={handleAppFormChange} placeholder="Ex: Conciliação Amazonense Nº 3" required />
                                                </div>
                                                <div className="field">
                                                    <label>Nome do Maçom</label>
                                                    <input type="text" name="mason_name" value={appForm.mason_name} onChange={handleAppFormChange} placeholder="Nome do Irmão relacionado" required />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="field">
                                        <label><Send size={14} /> Mensagem de Apresentação</label>
                                        <textarea name="cover_message" value={appForm.cover_message} onChange={handleAppFormChange} rows={4} placeholder="Conte brevemente por que você é ideal para esta vaga..." required></textarea>
                                    </div>
                                    <button type="submit" className="btn-gold" disabled={submitting || isMasonicApplicant === null || (isMasonicApplicant && (!appForm.relationship || !appForm.lodge_name || !appForm.mason_name))}>
                                        {submitting ? 'Enviando...' : 'Enviar Candidatura'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default BusinessClub;
