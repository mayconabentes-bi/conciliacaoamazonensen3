import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Vite exposes the base URL via import.meta.env.BASE_URL, which matches the `base`
// field in vite.config.js. When the app is served from a subpath (e.g. during
// development at /conciliacaoamazonensen3/), the router needs the same basename
// so that the <Route path="/"> entries resolve correctly.

import { useReveal } from './hooks/useReveal';
import { useContent } from './hooks/useContent';

// Public Components
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ValuesStrip from './components/ValuesStrip/ValuesStrip';
import Intro from './components/Intro/Intro';
import ValuesDeepDive from './components/ValuesDeepDive/ValuesDeepDive';
import StatsBar from './components/StatsBar/StatsBar';
import History from './components/History/History';
import HistoryGeneral from './components/HistoryGeneral/HistoryGeneral';
import AcademyPortal from './components/Academia/AcademyPortal';
import Instituto from './components/Instituto/Instituto';
import Testimonials from './components/Testimonials/Testimonials';
import Newsletter from './components/Newsletter/Newsletter';
import Nominata from './components/Nominata/Nominata';
import Footer from './components/Footer/Footer';

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

const Website = ({ content, heroIndex, setHeroIndex, syncHeroSlide, submitTestimonial }) => (
    <div className="app">
        <Navbar content={content.nav} />
        <Hero content={content.hero} onSlideChange={setHeroIndex} />
        <ValuesStrip content={content.hero} activeIndex={heroIndex} onTabClick={syncHeroSlide} />
        <main>
            <Intro content={content.intro} />
            <ValuesDeepDive content={content.values} />
            <StatsBar content={content.stats} />
            <History content={content.history} />
            <HistoryGeneral content={content.historyGeneral} />
            <HistoryGeneral content={content.historyBrazil} id="maconaria-brasil" />
            <HistoryGeneral content={content.historyAmazonas} id="maconaria-amazonas" />
            <HistoryGeneral content={content.historyGlomam} id="glomam" />
            <HistoryGeneral content={content.clubeAcacias} id="clube-acacias" />
            <AcademyPortal content={content} />
            <Instituto content={content.institute} />
            <Nominata content={content.nominata} />
            <Testimonials content={content.testimonials} onSubmit={submitTestimonial} />
            <Newsletter content={content.newsletter} />
        </main>
        <Footer content={content.footer} />
    </div>
);

const App = () => {
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
        <Router basename={import.meta.env.BASE_URL}>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                    <Website
                        content={content}
                        heroIndex={heroIndex}
                        setHeroIndex={setHeroIndex}
                        syncHeroSlide={syncHeroSlide}
                        submitTestimonial={submitTestimonial}
                    />
                } />

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
        </Router>
    );
};

export default App;
