import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Error Boundary — Prevents blank screen on unexpected render crashes
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error('[ErrorBoundary] Crash capturado:', error, info);
    }
    handleReset = () => {
        localStorage.removeItem('conciliacao_content');
        window.location.reload();
    };
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '4rem 2rem', textAlign: 'center', fontFamily: 'Lato, sans-serif', color: '#ccc', background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ fontFamily: 'Cinzel, serif', color: '#d4af37', marginBottom: '1rem' }}>Erro Inesperado</h1>
                    <p style={{ maxWidth: 500 }}>Ocorreu um erro ao carregar o site. Isso pode ser causado por dados em cache corrompidos.</p>
                    <button onClick={this.handleReset} style={{ marginTop: '2rem', padding: '0.8rem 2rem', background: '#d4af37', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                        Limpar Cache e Recarregar
                    </button>
                    <details style={{ marginTop: '2rem', color: '#666', fontSize: '0.8rem', maxWidth: 600 }}>
                        <summary>Detalhes técnicos</summary>
                        <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{this.state.error?.toString()}</pre>
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}

import { useReveal } from './hooks/useReveal';
import { useContent } from './hooks/useContent';

// Public Pages & Layouts
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import HistoryPage from './pages/HistoryPage';
import AcademyPage from './pages/AcademyPage';
import InstitutePage from './pages/InstitutePage';
import NominataPage from './pages/NominataPage';
import BusinessClubPage from './pages/BusinessClubPage';
import ResumeRegistrationPage from './pages/ResumeRegistrationPage';

// Admin Components
import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import HeroEditor from './admin/editors/HeroEditor';
import IntroEditor from './admin/editors/IntroEditor';
import HistoryEditor from './admin/editors/HistoryEditor';
import ValuesEditor from './admin/editors/ValuesEditor';
import AcademyEditor from './admin/editors/AcademyEditor';
import InstituteEditor from './admin/editors/InstituteEditor';
import FooterEditor from './admin/editors/FooterEditor';
import NavEditor from './admin/editors/NavEditor';
import NominataEditor from './admin/editors/NominataEditor';
import StatsEditor from './admin/editors/StatsEditor';
import TestimonialsEditor from './admin/editors/TestimonialsEditor';
import NewsletterEditor from './admin/editors/NewsletterEditor';
import GenericSectionEditor from './admin/editors/GenericSectionEditor';
import SessionsEditor from './admin/editors/SessionsEditor';
import BusinessClubEditor from './admin/editors/BusinessClubEditor';


// AppContent lives INSIDE the Router so hooks like useReveal (which calls useLocation) work correctly.
const AppContent = () => {
    const [heroIndex, setHeroIndex] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { content, updateSection, submitTestimonial } = useContent();
    useReveal();

    const syncHeroSlide = (index) => {
        const carouselEvent = new CustomEvent('syncHero', { detail: index });
        window.dispatchEvent(carouselEvent);
        setHeroIndex(index);
    };

    return (
        <Routes>
            {/* Public Routes with Shared Layout */}
            <Route element={<PublicLayout content={content} sessions={content.sessions} />}>
                <Route path="/" element={
                    <Home
                        content={content}
                        heroIndex={heroIndex}
                        setHeroIndex={setHeroIndex}
                        syncHeroSlide={syncHeroSlide}
                        submitTestimonial={submitTestimonial}
                    />
                } />
                <Route path="/historia" element={<HistoryPage content={content} />} />
                <Route path="/academia" element={<AcademyPage content={content} />} />
                <Route path="/instituto" element={<InstitutePage content={content} />} />
                <Route path="/integracao-oficio" element={<BusinessClubPage content={content} />} />
                <Route path="/integracao-oficio/cadastro" element={<ResumeRegistrationPage />} />
                <Route path="/nominata" element={<NominataPage content={content} />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/admin" /> : <Login onLogin={setIsAuthenticated} />
            } />

            <Route path="/admin" element={
                isAuthenticated ? <AdminLayout setAuth={setIsAuthenticated} /> : <Navigate to="/login" />
            }>
                <Route index element={<Dashboard />} />
                <Route path="menu" element={<NavEditor content={content.nav} onUpdate={(data) => updateSection('nav', data)} />} />
                <Route path="intro" element={<IntroEditor content={content.intro} onUpdate={(data) => updateSection('intro', data)} />} />
                <Route path="hero" element={<HeroEditor content={content.hero} onUpdate={(data) => updateSection('hero', data)} />} />
                <Route path="history" element={<HistoryEditor content={content.history} onUpdate={(data) => updateSection('history', data)} />} />
                <Route path="values" element={<ValuesEditor content={content.values} onUpdate={(data) => updateSection('values', data)} />} />
                <Route path="academy" element={<AcademyEditor content={content.academy} onUpdate={(data) => updateSection('academy', data)} />} />
                <Route path="institute" element={<InstituteEditor content={content.institute} onUpdate={(data) => updateSection('institute', data)} />} />
                <Route path="nominata" element={<NominataEditor content={content.nominata} onUpdate={(data) => updateSection('nominata', data)} />} />
                <Route path="stats" element={<StatsEditor content={content.stats} onUpdate={(data) => updateSection('stats', data)} />} />
                <Route path="testimonials" element={<TestimonialsEditor content={content.testimonials} onUpdate={(data) => updateSection('testimonials', data)} />} />
                <Route path="newsletter" element={<NewsletterEditor content={content.newsletter} onUpdate={(data) => updateSection('newsletter', data)} />} />
                <Route path="sessions" element={<SessionsEditor content={content.sessions} onUpdate={(data) => updateSection('sessions', data)} />} />
                <Route path="business-club" element={<BusinessClubEditor />} />
                
                {/* History & Info Pages */}
                <Route path="history-general" element={<GenericSectionEditor title="Maçonaria Geral" content={content.historyGeneral} onUpdate={(data) => updateSection('historyGeneral', data)} />} />
                <Route path="history-brazil" element={<GenericSectionEditor title="Maçonaria no Brasil" content={content.historyBrazil} onUpdate={(data) => updateSection('historyBrazil', data)} />} />
                <Route path="history-amazonas" element={<GenericSectionEditor title="Maçonaria no Amazonas" content={content.historyAmazonas} onUpdate={(data) => updateSection('historyAmazonas', data)} />} />
                <Route path="history-glomam" element={<GenericSectionEditor title="GLOMAM" content={content.historyGlomam} onUpdate={(data) => updateSection('historyGlomam', data)} />} />
                <Route path="clube-acacias" element={<GenericSectionEditor title="Clube das Acácias" content={content.clubeAcacias} onUpdate={(data) => updateSection('clubeAcacias', data)} />} />
                
                {/* Academy Extended */}
                <Route path="library" element={<GenericSectionEditor title="Academia: Biblioteca" content={content.library} onUpdate={(data) => updateSection('library', data)} />} />
                <Route path="lectures" element={<GenericSectionEditor title="Academia: Palestras" content={content.lectures} onUpdate={(data) => updateSection('lectures', data)} />} />
                <Route path="seminars" element={<GenericSectionEditor title="Academia: Seminários" content={content.seminars} onUpdate={(data) => updateSection('seminars', data)} />} />

                <Route path="footer" element={<FooterEditor content={content.footer} onUpdate={(data) => updateSection('footer', data)} />} />
                <Route path="*" element={<div className="admin-card">Em desenvolvimento...</div>} />
            </Route>
        </Routes>
    );
};

// App wraps everything: ErrorBoundary > Router > AppContent
// This ensures useLocation() (used by useReveal) has Router context.
const App = () => {
    return (
        <ErrorBoundary>
            <Router basename={import.meta.env.BASE_URL}>
                <AppContent />
            </Router>
        </ErrorBoundary>
    );
};

export default App;
