import React from 'react';
import { Search, LayoutGrid, List, ArrowLeft } from 'lucide-react';
import './AcademyFilterBar.css';

const AcademyFilterBar = ({ categories, activeCategory, setActiveCategory, searchQuery, setSearchQuery, viewType, setViewType, onBack }) => {
    return (
        <div className="academy-filter-container container">
            <div className="academy-filter-bar">
                <div className="filter-bar-top">
                    <button className="filter-back-btn cinzel" onClick={onBack}>
                        <ArrowLeft size={16} /> Voltar
                    </button>
                    <div className="academy-search">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder={`Pesquisar em ${activeCategory}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="cormorant"
                        />
                    </div>
                    <div className="view-toggle">
                        <button
                            className={`toggle-btn ${viewType === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewType('grid')}
                            title="Visualização em Grade"
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            className={`toggle-btn ${viewType === 'list' ? 'active' : ''}`}
                            onClick={() => setViewType('list')}
                            title="Visualização em Lista"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
                <div className="academy-categories">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            className={`filter-chip cinzel ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AcademyFilterBar;
