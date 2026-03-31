import React, { useState, useMemo, useEffect } from 'react';
import AcademyHero from '../components/Academia/AcademyHero';
import AcademyFilterBar from '../components/Academia/AcademyFilterBar';
import AcademyGrid from '../components/Academia/AcademyGrid';
import AcademyReader from '../components/Academia/AcademyReader';
import './AcademyPage.css';

const AcademyPage = ({ content }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [unlockedItems, setUnlockedItems] = useState(new Set());
    const [viewingItem, setViewingItem] = useState(null);
    const [isLockedView, setIsLockedView] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const allItems = useMemo(() => {
        let items = [];
        
        if (content?.academy?.articles) {
            items = [...items, ...content.academy.articles.map(item => ({
                ...item,
                sourceCat: 'Artigos Filosóficos'
            }))];
        }
        
        if (content?.lectures?.sections) {
            items = [...items, ...content.lectures.sections.map(item => ({
                ...item,
                cat: item.cat || 'Palestras',
                sourceCat: 'Palestras'
            }))];
        }
        
        if (content?.seminars?.sections) {
            items = [...items, ...content.seminars.sections.map(item => ({
                ...item,
                cat: item.cat || 'Seminários',
                sourceCat: 'Seminários'
            }))];
        }
        
        if (content?.library?.sections) {
            items = [...items, ...content.library.sections.map(item => ({
                ...item,
                cat: item.cat || 'Acervo Digital',
                sourceCat: 'Acervo Digital'
            }))];
        }

        return items;
    }, [content]);

    const categories = ['Todos', 'Artigos Filosóficos', 'Palestras', 'Seminários', 'Acervo Digital'];

    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesCategory = activeCategory === 'Todos' || item.sourceCat === activeCategory;
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = !searchQuery || 
                (item.title && item.title.toLowerCase().includes(searchLower)) ||
                (item.excerpt && item.excerpt.toLowerCase().includes(searchLower)) ||
                (item.cat && item.cat.toLowerCase().includes(searchLower)) ||
                (item.content && item.content.toLowerCase().includes(searchLower));

            return matchesCategory && matchesSearch;
        });
    }, [allItems, activeCategory, searchQuery]);

    const handleItemClick = (item, isLocked) => {
        setViewingItem(item);
        setIsLockedView(isLocked);
    };

    const handleUnlock = (title) => {
        setUnlockedItems(prev => new Set([...prev, title]));
        setIsLockedView(false);
    };

    const handleCloseReader = () => {
        setViewingItem(null);
        setIsLockedView(false);
    };

    return (
        <div className="academy-page page-transition">
            <AcademyHero />
            
            <AcademyFilterBar 
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            
            <AcademyGrid 
                items={filteredItems}
                onItemClick={handleItemClick}
                unlockedItems={unlockedItems}
            />

            {viewingItem && (
                <AcademyReader 
                    item={viewingItem}
                    onClose={handleCloseReader}
                    isLocked={isLockedView}
                    onUnlock={handleUnlock}
                />
            )}
        </div>
    );
};

export default AcademyPage;
