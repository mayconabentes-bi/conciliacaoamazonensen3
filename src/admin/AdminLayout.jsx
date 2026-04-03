import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Image as ImageIcon, 
    History, 
    GraduationCap, 
    Building2, 
    LogOut, 
    Info, 
    Heart, 
    ScrollText, 
    Menu, 
    Users, 
    BarChart3, 
    MessageSquare, 
    Mail, 
    FileText, 
    Library, 
    Mic2, 
    Calendar,
    ExternalLink
} from 'lucide-react';
import './Admin.css';

const AdminLayout = ({ setAuth }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(false);
        navigate('/');
    };

    const sectionTitleStyle = {
        padding: '24px 24px 8px',
        fontSize: '0.65rem',
        color: 'var(--admin-gold)',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        fontWeight: 'bold',
        opacity: 0.8
    };

    return (
        <div className="admin-wrapper">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>PAINEL CMS</h2>
                </div>
                <nav className="sidebar-nav" style={{ overflowY: 'auto' }}>
                    <NavLink to="/" className="nav-item" style={{ borderBottom: '1px solid var(--admin-border)', marginBottom: '8px' }}>
                        <ExternalLink size={18} /> Site Público
                    </NavLink>
                    
                    <div style={sectionTitleStyle}>Painel Principal</div>
                    <NavLink to="/admin" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard size={18} /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/menu" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Menu size={18} /> Navegação e Topo
                    </NavLink>
                    <NavLink to="/admin/hero" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <ImageIcon size={18} /> Banner (Hero)
                    </NavLink>
                    <NavLink to="/admin/intro" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Info size={18} /> Introdução
                    </NavLink>

                    <div style={sectionTitleStyle}>Conteúdo Especializado</div>
                    <NavLink to="/admin/academy" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <GraduationCap size={18} /> Academia (Artigos)
                    </NavLink>
                    <NavLink to="/admin/library" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Library size={18} /> Biblioteca
                    </NavLink>
                    <NavLink to="/admin/lectures" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Mic2 size={18} /> Palestras & Vídeos
                    </NavLink>
                    <NavLink to="/admin/seminars" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Calendar size={18} /> Seminários
                    </NavLink>
                    <NavLink to="/admin/institute" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Heart size={18} /> Instituto Social
                    </NavLink>

                    <div style={sectionTitleStyle}>Gestão & Social</div>
                    <NavLink to="/admin/nominata" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Users size={18} /> Nominata
                    </NavLink>
                    <NavLink to="/admin/testimonials" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <MessageSquare size={18} /> Depoimentos
                    </NavLink>
                    <NavLink to="/admin/stats" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <BarChart3 size={18} /> Estatísticas
                    </NavLink>
                    <NavLink to="/admin/newsletter" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Mail size={18} /> Newsletter
                    </NavLink>

                    <div style={sectionTitleStyle}>Páginas Institucionais</div>
                    <NavLink to="/admin/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <History size={18} /> Nossa História
                    </NavLink>
                    <NavLink to="/admin/history-general" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <FileText size={18} /> Maçonaria Geral
                    </NavLink>
                    <NavLink to="/admin/history-brazil" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <FileText size={18} /> No Brasil
                    </NavLink>
                    <NavLink to="/admin/history-amazonas" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <FileText size={18} /> No Amazonas
                    </NavLink>
                    <NavLink to="/admin/history-glomam" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Building2 size={18} /> GLOMAM
                    </NavLink>
                    <NavLink to="/admin/clube-acacias" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <FileText size={18} /> Clube das Acácias
                    </NavLink>
                    <NavLink to="/admin/business-club" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Briefcase size={18} /> Clube de Negócios
                    </NavLink>
                    <NavLink to="/admin/footer" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <ScrollText size={18} /> Rodapé (Footer)
                    </NavLink>
                </nav>
                <div className="sidebar-footer" style={{ padding: '20px', borderTop: '1px solid var(--admin-border)' }}>
                    <button onClick={handleLogout} className="nav-item" style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', padding: '10px 0' }}>
                        <LogOut size={18} /> Sair do Painel
                    </button>
                </div>
            </aside>
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

