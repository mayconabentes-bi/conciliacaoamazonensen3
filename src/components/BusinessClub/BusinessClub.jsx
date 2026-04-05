import React, { useState, useEffect } from 'react';
import { Briefcase, UserPlus, Users, Search, MapPin, DollarSign, ExternalLink, Mail, Linkedin, Award, User, X, CheckCircle, Phone, Send, Shield, Globe } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import CustomSelect from '../Common/CustomSelect';
import './BusinessClub.css';

const BusinessClub = ({ content }) => {
    useReveal();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('vagas');
    const [jobs, setJobs] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const bondOptions = [
        'Irmão (Membro Regular)',
        'Cunhada (Esposa/Viúva de Maçom)',
        'Sobrinha (Filha de Maçom)',
        'Sobrinho (Filho de Maçom)',
        'Baixa (Parente de Maçom)',
        'Comunidade Maçônica',
        'Outro'
    ];
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

    // Re-trigger reveal animations after async data loads
    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                const revealEls = document.querySelectorAll('.reveal:not(.visible)');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(e => {
                        if (e.isIntersecting) {
                            e.target.classList.add('visible');
                            observer.unobserve(e.target);
                        }
                    });
                }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
                revealEls.forEach(el => observer.observe(el));
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [loading, jobs, resumes]);

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

    // Helper for horizontal scrolling
    const scrollRow = (id, direction) => {
        const container = document.getElementById(id);
        if (container) {
            const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const FeaturedHero = () => {
        const featured = jobs[0] || resumes[0] || null;

        return (
            <div className="bc-featured-hero reveal">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-badge">✦ Espaço de Integração e Ofício</div>
                    <h1>{featured ? (featured.title || featured.role) : 'Conecte-se ao Círculo'}</h1>
                    <p>{featured ? (featured.description || featured.bio) : 'Descubra oportunidades exclusivas e conecte seu talento à nossa rede de confiança. Publique vagas, encontre profissionais ou cadastre seu currículo.'}</p>
                    <div className="hero-actions">
                        {featured?.title ? (
                            <button className="btn-gold" onClick={() => handleApply(featured)}>
                                Candidatar-se Agora
                            </button>
                        ) : (
                            <button className="btn-gold" onClick={() => navigate('/integracao-oficio/cadastro')}>
                                Cadastrar Currículo
                            </button>
                        )}
                        <button className="btn-save ghost" onClick={() => navigate('/integracao-oficio/cadastro')}>
                            <UserPlus size={18} /> Banco de Talentos
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const ContentRow = ({ title, items, type, id }) => {
        return (
            <div className="bc-content-row reveal">
                <div className="row-header">
                    <h2>{title}</h2>
                    {items && items.length > 3 && (
                        <div className="row-nav">
                            <button onClick={() => scrollRow(id, 'left')}>‹</button>
                            <button onClick={() => scrollRow(id, 'right')}>›</button>
                        </div>
                    )}
                </div>
                {items && items.length > 0 ? (
                    <div className="row-scroll-container" id={id}>
                        {items.map((item, idx) => (
                            <div key={idx} className={`${type}-card-streaming`}>
                                {type === 'job' ? (
                                    <div className="card-inner">
                                        <div className="card-top">
                                            <span className="badge">{item.type}</span>
                                            <Briefcase size={20} className="icon" />
                                        </div>
                                        <h3>{item.title}</h3>
                                        <p className="company">{item.company}</p>
                                        <div className="meta">
                                            <span><MapPin size={12} /> {item.location}</span>
                                            {item.salary && <span><DollarSign size={12} /> {item.salary}</span>}
                                        </div>
                                        <button className="card-btn" onClick={() => handleApply(item)}>Explorar</button>
                                    </div>
                                ) : (
                                    <div className="card-inner">
                                        <div className="talent-avatar-streaming">
                                            {item.photo_url ? (
                                                <img src={item.photo_url} alt={item.full_name} />
                                            ) : (
                                                <span>{item.full_name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <h3>{item.full_name}</h3>
                                        <p className="role">{item.role}</p>
                                        <div className="skills-mini">
                                            {item.skills?.slice(0, 2).map((skill, i) => (
                                                <span key={i}>{skill}</span>
                                            ))}
                                            {item.skills?.length > 2 && <span>+{item.skills.length - 2}</span>}
                                        </div>
                                        <div className="talent-actions-mini">
                                            <a href={`mailto:${item.contact_email}`}><Mail size={14} /></a>
                                            {item.linkedin_url && <a href={item.linkedin_url} target="_blank" rel="noopener noreferrer"><Linkedin size={14} /></a>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        {type === 'job' ? <Search size={40} /> : <Users size={40} />}
                        <p>{type === 'job' ? 'Nenhuma vaga disponível no momento.' : 'Nenhum talento cadastrado ainda.'}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <section className="business-club streaming-style">
            <div className="container">
                <header className="bc-header reveal">
                    <div className="gold-line"><span>Espaço de Integração e Ofício</span></div>
                    <h1>Excelência e Ofício<br /><em>no Círculo de Confiança</em></h1>
                </header>

                {loading ? (
                    <div className="loading">Sincronizando Banco de Talentos...</div>
                ) : (
                    <>
                        <FeaturedHero />
                        
                        <main className="bc-streaming-content">
                            <ContentRow 
                                id="vagas-recentes"
                                title="Oportunidades no Círculo" 
                                items={jobs} 
                                type="job" 
                            />
                            
                            <ContentRow 
                                id="talentos-destaque"
                                title="Talentos em Evidência" 
                                items={resumes} 
                                type="talent" 
                            />

                            <div className="bc-cta-banner reveal">
                                <div className="cta-content">
                                    <h3>Faça parte do nosso Banco de Talentos</h3>
                                    <p>Conecte seu currículo com as melhores oportunidades dentro da nossa rede de colaboração.</p>
                                    <button className="btn-gold" onClick={() => navigate('/integracao-oficio/cadastro')}>
                                        Cadastrar Agora
                                    </button>
                                </div>
                            </div>
                        </main>
                    </>
                )}
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
                                    <p className="modal-company">{selectedJob.company} — {selectedJob.location} {selectedJob.salary && `— ${selectedJob.salary}`}</p>
                                </div>
                                
                                <div className="modal-description-section" style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h4 style={{ color: 'var(--gold)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Descrição da Vaga</h4>
                                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>{selectedJob.description}</p>
                                    
                                    {selectedJob.requirements && (
                                        <>
                                            <h4 style={{ color: 'var(--gold)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Requisitos</h4>
                                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap' }}>{selectedJob.requirements}</p>
                                        </>
                                    )}
                                </div>

                                <div className="modal-divider" style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '2rem 0' }}></div>
                                <h4 style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'Cinzel, serif', fontSize: '1rem', color: 'var(--gold)' }}>Formulário de Candidatura</h4>

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
                                                <CustomSelect 
                                                    options={bondOptions}
                                                    value={appForm.relationship}
                                                    onChange={(val) => setAppForm(prev => ({ ...prev, relationship: val }))}
                                                    placeholder="Selecione seu vínculo..."
                                                />
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
