import React, { useState, useRef } from 'react';
import { Camera, User, Mail, Linkedin, Award, Link, ArrowRight, CheckCircle2, ChevronLeft, Briefcase, Shield, Globe } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../Common/CustomSelect';

const ResumeForm = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    
    const [formData, setFormData] = useState({
        full_name: '',
        role: '',
        relationship: '',
        lodge_name: '',
        mason_name: '',
        experience_years: '',
        bio: '',
        skills: '',
        contact_email: '',
        linkedin_url: ''
    });

    const bondOptions = [
        'Irmão (Membro Regular)',
        'Cunhada (Esposa/Viúva de Maçom)',
        'Sobrinha (Filha de Maçom)',
        'Sobrinho (Filho de Maçom)',
        'Baixa (Parente de Maçom)',
        'Comunidade Maçônica',
        'Outro'
    ];

    const [isMasonicMember, setIsMasonicMember] = useState(null); // null = not chosen, true/false

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const uploadPhoto = async () => {
        if (!photo) return null;
        
        try {
            const fileExt = photo.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `resumes/${fileName}`;
            
            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(filePath, photo);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('resumes').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading photo:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            const photo_url = await uploadPhoto();
            const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
            
            const { error } = await supabase.from('resumes').insert([{
                ...formData,
                relationship: isMasonicMember ? formData.relationship : 'Comunidade Externa',
                lodge_name: isMasonicMember ? formData.lodge_name : null,
                mason_name: isMasonicMember ? formData.mason_name : null,
                photo_url,
                skills: skillsArray,
                experience_years: parseInt(formData.experience_years) || 0,
                is_public: true
            }]);

            if (error) throw error;
            setStep(3); // Success step
        } catch (error) {
            alert('Erro ao cadastrar currículo: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="resume-form-container reveal">
            <div className="container">
                <div className="form-wrapper">
                    {step === 1 && (
                        <div className="form-card">
                            <div className="form-header">
                                <div className="gold-line"><span>Novo Cadastro</span></div>
                                <h2>Cadastro Profissional<br /><em>Conciliação</em></h2>
                                <p>Sua identidade e conexão com a comunidade maçônica.</p>
                            </div>

                            <div className="registration-content">
                                <div className="photo-upload-section" onClick={() => fileInputRef.current.click()}>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        onChange={handlePhotoChange} 
                                        accept="image/*" 
                                        style={{ display: 'none' }} 
                                    />
                                    <div className="photo-preview">
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Preview" />
                                        ) : (
                                            <div className="photo-placeholder">
                                                <Camera size={32} />
                                                <span>Adicionar Foto Profissional</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="field" style={{ gridColumn: '1 / -1' }}>
                                        <label>Nome Completo</label>
                                        <input type="text" name="full_name" value={formData.full_name} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="masonic-toggle">
                                    <label className="toggle-label">Vínculo com a Maçonaria</label>
                                    <div className="toggle-cards">
                                        <div 
                                            className={`toggle-card ${isMasonicMember === true ? 'active' : ''}`}
                                            onClick={() => setIsMasonicMember(true)}
                                        >
                                            <Shield size={28} />
                                            <span>Membro ou Parente</span>
                                        </div>
                                        <div 
                                            className={`toggle-card ${isMasonicMember === false ? 'active' : ''}`}
                                            onClick={() => { 
                                                setIsMasonicMember(false); 
                                                setFormData(prev => ({ ...prev, relationship: '', lodge_name: '', mason_name: '' })); 
                                            }}
                                        >
                                            <Globe size={28} />
                                            <span>Público Geral</span>
                                        </div>
                                    </div>
                                </div>

                                {isMasonicMember === true && (
                                    <div className="masonic-fields" style={{ animation: 'slideDown 0.4s ease' }}>
                                        <div className="field">
                                            <label>Vínculo Maçônico</label>
                                            <CustomSelect 
                                                options={bondOptions}
                                                value={formData.relationship}
                                                onChange={(val) => setFormData(prev => ({ ...prev, relationship: val }))}
                                                placeholder="Selecione seu vínculo..."
                                            />
                                        </div>
                                        <div className="form-grid">
                                            <div className="field">
                                                <label>Nome da Loja Maçônica</label>
                                                <input type="text" name="lodge_name" value={formData.lodge_name} onChange={handleInputChange} placeholder="Ex: Conciliação Amazonense Nº 3" required />
                                            </div>
                                            <div className="field">
                                                <label>Nome do Maçom (Referência)</label>
                                                <input type="text" name="mason_name" value={formData.mason_name} onChange={handleInputChange} placeholder="Nome do Irmão relacionado" required />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button 
                                    className="btn-gold block" 
                                    disabled={!formData.full_name || isMasonicMember === null || (isMasonicMember && (!formData.relationship || !formData.lodge_name || !formData.mason_name))}
                                    onClick={() => setStep(2)}
                                >
                                    Continuar para dados técnicos <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="form-card">
                            <div className="form-header">
                                <button className="btn-back" onClick={() => setStep(1)}><ChevronLeft size={18} /> Voltar</button>
                                <h2>Dados Profissionais</h2>
                                <p>Dê visibilidade ao que você faz de melhor.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="form-grid-full">
                                <div className="form-row-multi">
                                    <div className="field">
                                        <label><Briefcase size={14} /> Cargo / Especialidade</label>
                                        <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Ex: Engenheiro, Arquiteto..." required />
                                    </div>
                                    <div className="field" style={{ width: '120px' }}>
                                        <label><Award size={14} /> Experiência (Anos)</label>
                                        <input type="number" name="experience_years" value={formData.experience_years} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="field">
                                    <label><Link size={14} /> Habilidades (Tags separadas por vírgula)</label>
                                    <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} placeholder="Ex: Gestão, Financeiro, Autocad..." required />
                                </div>

                                <div className="field">
                                    <label>Resumo Profissional (Bio)</label>
                                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} placeholder="Conte brevemente sobre sua jornada profissional..." required></textarea>
                                </div>

                                <div className="form-row-multi">
                                    <div className="field">
                                        <label><Mail size={14} /> E-mail de Contato</label>
                                        <input type="email" name="contact_email" value={formData.contact_email} onChange={handleInputChange} required />
                                    </div>
                                    <div className="field">
                                        <label><Linkedin size={14} /> LinkedIn URL</label>
                                        <input type="url" name="linkedin_url" value={formData.linkedin_url} onChange={handleInputChange} placeholder="https://..." />
                                    </div>
                                </div>

                                <button type="submit" className="btn-gold block" disabled={submitting}>
                                    {submitting ? 'Enviando Currículo...' : 'Finalizar e Publicar'}
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="form-card success-card text-center">
                            <CheckCircle2 size={80} color="var(--gold)" className="margin-auto" />
                            <h2>Cadastro Realizado!</h2>
                            <p>Seu perfil agora faz parte do Banco de Talentos do Espaço de Integração e Ofício Conciliação.</p>
                            <button className="btn-gold" onClick={() => navigate('/integracao-oficio')}>
                                Ir para o Espaço de Integração e Ofício
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .resume-form-container { padding: 4rem 0; color: var(--white); }
                .form-wrapper { max-width: 650px; margin: 0 auto; }
                .form-card { background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border); padding: 3rem; border-radius: 12px; }
                .form-header { text-align: center; margin-bottom: 2.5rem; }
                .form-header h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; font-weight: 300; line-height: 1.1; margin-bottom: 1rem; }
                .form-header h2 em { color: var(--gold); }
                .form-header p { color: rgba(255, 255, 255, 0.5); font-size: 0.95rem; }
                
                .photo-upload-section { margin-bottom: 2.5rem; cursor: pointer; }
                .photo-preview { width: 120px; height: 120px; margin: 0 auto; border-radius: 50%; border: 2px dashed var(--gold); overflow: hidden; position: relative; }
                .photo-preview img { width: 100%; height: 100%; object-fit: cover; }
                .photo-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--gold-lt); text-align: center; padding: 10px; }
                .photo-placeholder span { font-size: 0.65rem; text-transform: uppercase; margin-top: 8px; letter-spacing: 0.05em; }
                
                .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
                .form-row-multi { display: flex; gap: 1.5rem; margin-bottom: 1.5rem; }
                .form-row-multi .field { flex: 1; }
                
                .field { margin-bottom: 1.5rem; text-align: left; }
                .field label { display: flex; align-items: center; gap: 8px; font-family: 'Cinzel', serif; font-size: 0.65rem; color: rgba(255, 255, 255, 0.4); margin-bottom: 8px; text-transform: uppercase; font-weight: 600; }
                .field input, .field select, .field textarea { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 0.9rem; border-radius: 6px; color: var(--white); font-size: 1rem; transition: all 0.3s; }
                .field select option { background: var(--navy-deep); }
                .field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: var(--gold); background: rgba(255,255,255,0.08); }
                
                .btn-back { display: flex; align-items: center; gap: 6px; color: var(--gold-lt); font-size: 0.8rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7; transition: 0.3s; }
                .btn-back:hover { opacity: 1; }
                
                .success-card .margin-auto { margin: 0 auto 2rem; display: block; }
                .text-center { text-align: center; }
                .block { width: 100%; display: flex; justify-content: center; gap: 10px; padding: 1rem; }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @media (max-width: 600px) {
                    .form-grid, .form-row-multi { grid-template-columns: 1fr; flex-direction: column; }
                    .form-card { padding: 1.5rem; }
                }
            `}} />
        </div>
    );
};

export default ResumeForm;
