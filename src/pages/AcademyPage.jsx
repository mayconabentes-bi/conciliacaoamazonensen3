import React, { useState, useMemo, useEffect } from 'react';
import AcademyHero from '../components/Academia/AcademyHero';
import AcademyGrauSelector from '../components/Academia/AcademyGrauSelector';
import AcademyFilterBar from '../components/Academia/AcademyFilterBar';
import AcademyGrid from '../components/Academia/AcademyGrid';
import AcademyDashboard from '../components/Academia/AcademyDashboard';
import AcademyReader from '../components/Academia/AcademyReader';
import PasswordGateModal from '../components/Academia/PasswordGateModal';
import { useGrauAccess } from '../hooks/useGrauAccess';
import './AcademyPage.css';

const GRAU_NAMES = { 1: 'Aprendiz', 2: 'Companheiro', 3: 'Mestre' };

const AcademyPage = ({ content }) => {
    const [userGrau, setUserGrau] = useState(() => {
        const saved = localStorage.getItem('academy_grau');
        return saved ? parseInt(saved) : 1;
    });
    const [viewMode, setViewMode] = useState('home'); // 'home' or 'category'
    const [activeCategory, setActiveCategory] = useState('Artigos');
    const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
    const [searchQuery, setSearchQuery] = useState('');
    const [viewingItem, setViewingItem] = useState(null);

    // Password Gate state
    const [pendingItem, setPendingItem] = useState(null); // Item waiting for password verification
    const { needsPasswordChallenge, verifyPassword, getGrauConfig } = useGrauAccess(userGrau);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        localStorage.setItem('academy_grau', userGrau.toString());
    }, [userGrau]);

    // Build all items from content sections
    const allItems = useMemo(() => {
        let items = [];
        if (content?.academy?.articles) {
            items = [...items, ...content.academy.articles.map(i => ({ ...i, sourceCat: 'Artigos' }))];
        }
        if (content?.lectures?.sections) {
            items = [...items, ...content.lectures.sections.map(i => ({ ...i, sourceCat: 'Palestras' }))];
        }
        if (content?.seminars?.sections) {
            items = [...items, ...content.seminars.sections.map(i => ({ ...i, sourceCat: 'Seminários' }))];
        }
        if (content?.library?.sections) {
            items = [...items, ...content.library.sections.map(i => ({ ...i, sourceCat: 'Biblioteca Digital' }))];
        }
        if (content?.courses) {
            items = [...items, ...content.courses.map(i => ({ ...i, sourceCat: 'Cursos' }))];
        }
        return items;
    }, [content]);

    const categories = ['Artigos', 'Palestras', 'Seminários', 'Biblioteca Digital', 'Cursos'];

    // Items grouped by category for Home rows
    const categorizedItems = useMemo(() => {
        const groups = {};
        categories.forEach(cat => { groups[cat] = []; });
        allItems.forEach(item => {
            const itemGrau = item.grau || 1;
            if (itemGrau > userGrau) return; // Hide items above user's degree

            const cat = item.sourceCat || item.cat;
            if (groups[cat]) groups[cat].push(item);
        });
        return groups;
    }, [allItems, userGrau]);

    // Filtered items for Category view
    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const itemGrau = item.grau || 1;
            if (itemGrau > userGrau) return false; // Hide items above user's degree

            const matchesCat = item.sourceCat === activeCategory || item.cat === activeCategory;
            if (!matchesCat) return false;
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return (
                (item.title && item.title.toLowerCase().includes(q)) ||
                (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
                (item.content && item.content.toLowerCase().includes(q))
            );
        });
    }, [allItems, activeCategory, searchQuery, userGrau]);

    const handleViewAll = (cat) => {
        setActiveCategory(cat);
        setViewMode('category');
        setSearchQuery('');
        // Default view type per category
        if (cat === 'Artigos' || cat === 'Biblioteca Digital') {
            setViewType('list');
        } else {
            setViewType('grid');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToHome = () => {
        setViewMode('home');
        setSearchQuery('');
    };

    /**
     * Handles item click with password gate logic:
     * - If the degree hasn't been proven in this session → show PasswordGateModal
     * - Otherwise → open content directly
     */
    const handleItemClick = (item) => {
        const itemGrau = item.grau || 1;

        // Check if this item needs a password challenge
        if (needsPasswordChallenge(itemGrau)) {
            // Store the item as pending and show the password gate
            setPendingItem(item);
        } else {
            // Access granted directly (either same grau or already proved)
            setViewingItem(item);
        }
    };

    /**
     * Called when user submits password in the gate modal.
     * Returns true if correct, false if wrong.
     */
    const handlePasswordAttempt = (senhaDigitada) => {
        if (!pendingItem) return false;
        const itemGrau = pendingItem.grau || 1;

        if (verifyPassword(itemGrau, senhaDigitada)) {
            // After a brief success animation, open the content
            setTimeout(() => {
                setViewingItem(pendingItem);
                setPendingItem(null);
            }, 1500);

            return true;
        }

        return false;
    };

    const handleCloseGate = () => {
        setPendingItem(null);
    };

    const handleCloseReader = () => {
        setViewingItem(null);
    };

    const isLocked = (item) => {
        return false; // Items above user Grau are now hidden, so visible items don't strictly show as "locked" in the UI
    };

    const getGrauName = (level) => GRAU_NAMES[level] || 'Aprendiz';

    // Get config for the pending item's grau (for the modal)
    const pendingGrau = pendingItem ? (pendingItem.grau || 1) : null;
    const pendingConfig = pendingGrau ? getGrauConfig(pendingGrau) : null;

    return (
        <div className="academy-page page-transition">
            <AcademyHero />

            <div className="academy-page-body">
                <AcademyGrauSelector userGrau={userGrau} setUserGrau={setUserGrau} />

                {viewMode === 'home' ? (
                    <AcademyDashboard
                        categorizedItems={categorizedItems}
                        categories={categories}
                        userGrau={userGrau}
                        onViewAll={handleViewAll}
                        onItemClick={handleItemClick}
                        isLocked={isLocked}
                        getGrauName={getGrauName}
                    />
                ) : (
                    <>
                        <AcademyFilterBar
                            categories={categories}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            viewType={viewType}
                            setViewType={setViewType}
                            onBack={handleBackToHome}
                        />
                        <AcademyGrid
                            items={filteredItems}
                            viewType={viewType}
                            userGrau={userGrau}
                            onItemClick={handleItemClick}
                            isLocked={isLocked}
                            getGrauName={getGrauName}
                        />
                    </>
                )}
            </div>

            {/* Password Gate Modal — shown when clicking locked content */}
            {pendingItem && pendingConfig && (
                <PasswordGateModal
                    grau={pendingGrau}
                    pergunta={pendingConfig.pergunta}
                    onSuccess={handlePasswordAttempt}
                    onClose={handleCloseGate}
                />
            )}

            {/* Content Reader — shown after access is granted */}
            {viewingItem && (
                <AcademyReader
                    item={viewingItem}
                    onClose={handleCloseReader}
                    isLocked={false}
                    grauName={getGrauName(viewingItem.grau || 1)}
                    userGrauName={getGrauName(userGrau)}
                />
            )}
        </div>
    );
};

export default AcademyPage;
