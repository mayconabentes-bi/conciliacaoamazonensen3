import React, { useState, useEffect } from 'react';
import { Briefcase, UserPlus, Users, Search, MapPin, DollarSign, ExternalLink, Mail, Linkedin, Award, User } from 'lucide-react';
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
                                            <button className="btn-apply">Candidatar-se</button>
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
        </section>
    );
};

export default BusinessClub;
