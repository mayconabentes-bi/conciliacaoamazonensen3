import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Image as ImageIcon, 
    Users, 
    BarChart3, 
    MessageSquare, 
    ScrollText, 
    Menu as MenuIcon, 
    FileText, 
    Info,
    LayoutDashboard,
    Zap,
    BookOpen,
    Library,
    Mic2,
    GraduationCap,
    Heart,
    Calendar as CalendarIcon,
    Settings
} from 'lucide-react';

const Dashboard = () => {
    const commonActions = [
        { 
            title: 'Slider Principal (Hero)', 
            desc: 'Altere as imagens e textos que aparecem no topo do site.', 
            icon: <ImageIcon size={24} />, 
            path: '/admin/hero',
            complexity: 'Fácil'
        },
        { 
            title: 'Nominata de Oficiais', 
            desc: 'Atualize os nomes, cargos e fotos dos atuais oficiais da loja.', 
            icon: <Users size={24} />, 
            path: '/admin/nominata',
            complexity: 'Fácil'
        },
        { 
            title: 'Galeria dos Veneráveis Mestres', 
            desc: 'Clique aqui para carregar fotos, nomes e ano/período dos Veneráveis Mestres.', 
            icon: <Users size={24} />, 
            path: '/admin/veneraveis',
            complexity: 'Fácil'
        },
        { 
            title: 'Estatísticas', 
            desc: 'Edite os números em destaque (ex: Ir. Membros, Anos de Fundação).', 
            icon: <BarChart3 size={24} />, 
            path: '/admin/stats',
            complexity: 'Fácil'
        },
        { 
            title: 'Depoimentos', 
            desc: 'Gerencie o que as pessoas estão dizendo sobre a Conciliação.', 
            icon: <MessageSquare size={24} />, 
            path: '/admin/testimonials',
            complexity: 'Fácil'
        },
        { 
            title: 'Calendário de Sessões', 
            desc: 'Gerencie as próximas datas e sessões da loja.', 
            icon: <CalendarIcon size={24} />, 
            path: '/admin/sessions',
            complexity: 'Fácil'
        }
    ];

    const specializedActions = [
        { 
            title: 'Artigos da Academia', 
            desc: 'Gerencie os artigos filosóficos da Academia.', 
            icon: <BookOpen size={24} />, 
            path: '/admin/academy',
            complexity: 'Médio'
        },
        { 
            title: 'Cursos da Academia', 
            desc: 'Edite os cursos exibidos na Academia Filosófica.', 
            icon: <GraduationCap size={24} />, 
            path: '/admin/courses',
            complexity: 'Médio'
        },
        { 
            title: 'Biblioteca Digital', 
            desc: 'Edite os títulos e links da biblioteca.', 
            icon: <Library size={24} />, 
            path: '/admin/library',
            complexity: 'Médio'
        },
        { 
            title: 'Palestras e Vídeos', 
            desc: 'Gerencie o conteúdo de vídeo e palestras.', 
            icon: <Mic2 size={24} />, 
            path: '/admin/lectures',
            complexity: 'Médio'
        },
        { 
            title: 'Seminários', 
            desc: 'Atualize os próximos seminários e eventos.', 
            icon: <GraduationCap size={24} />, 
            path: '/admin/seminars',
            complexity: 'Médio'
        },
        { 
            title: 'Instituto Social', 
            desc: 'Gerencie os projetos sociais do Instituto.', 
            icon: <Heart size={24} />, 
            path: '/admin/institute',
            complexity: 'Médio'
        }
    ];

    const advancedActions = [
        { 
            title: 'Diagnóstico de Publicação', 
            desc: 'Verifique chaves VITE, Supabase e status das APIs usadas pelo site oficial.', 
            icon: <Settings size={24} />, 
            path: '/admin/diagnostics',
            complexity: 'Avançado'
        },
        { 
            title: 'Menu de Navegação', 
            desc: 'Gerencie os links do menu e a barra de anúncios superior.', 
            icon: <MenuIcon size={24} />, 
            path: '/admin/menu',
            complexity: 'Avançado'
        },
        { 
            title: 'Páginas de História', 
            desc: 'Edite Maçonaria Geral, Brasil e Amazonas.', 
            icon: <FileText size={24} />, 
            path: '/admin/history-general',
            complexity: 'Avançado'
        },
        { 
            title: 'Rodapé (Footer)', 
            desc: 'Altere contatos, redes sociais e textos da base.', 
            icon: <ScrollText size={24} />, 
            path: '/admin/footer',
            complexity: 'Avançado'
        }
    ];

    return (
        <div className="dashboard-container">
            <div className="admin-page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <LayoutDashboard size={32} color="var(--admin-gold)" />
                    <h1>Central de Comando</h1>
                </div>
            </div>

            <div className="dashboard-sections">
                <section>
                    <div className="dashboard-section-header">
                        <h2><Zap size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Edições Fundamentais</h2>
                    </div>
                    <div className="quick-cards-grid">
                        {commonActions.map((action, idx) => (
                            <Link key={idx} to={action.path} className="quick-card">
                                <div className="quick-card-icon">{action.icon}</div>
                                <div className="quick-card-info">
                                    <h3>{action.title}</h3>
                                    <p>{action.desc}</p>
                                    <span className="complexity-badge complexity-easy">{action.complexity}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="dashboard-section-header">
                        <h2><GraduationCap size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Conteúdo Especializado</h2>
                    </div>
                    <div className="quick-cards-grid">
                        {specializedActions.map((action, idx) => (
                            <Link key={idx} to={action.path} className="quick-card">
                                <div className="quick-card-icon" style={{ color: 'var(--admin-gold)' }}>{action.icon}</div>
                                <div className="quick-card-info">
                                    <h3>{action.title}</h3>
                                    <p>{action.desc}</p>
                                    <span className="complexity-badge" style={{ backgroundColor: 'rgba(201, 168, 76, 0.1)', color: 'var(--admin-gold)' }}>{action.complexity}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="dashboard-section-header">
                        <h2><Info size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Configurações do Site</h2>
                    </div>
                    <div className="quick-cards-grid">
                        {advancedActions.map((action, idx) => (
                            <Link key={idx} to={action.path} className="quick-card">
                                <div className="quick-card-icon">{action.icon}</div>
                                <div className="quick-card-info">
                                    <h3>{action.title}</h3>
                                    <p>{action.desc}</p>
                                    <span className="complexity-badge complexity-advanced">{action.complexity}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;

