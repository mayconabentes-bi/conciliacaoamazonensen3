import React from 'react';
import { Search } from 'lucide-react';
import './AcademyFilterBar.css';

const AcademyFilterBar = ({ categories, activeCategory, setActiveCategory, searchQuery, setSearchQuery }) => {
    return (
        <div className="academy-filter-container container">
            <div className="academy-filter-bar">
                <div className="academy-search">
                    <Search className="search-icon" size={20} />
                    <input 
                        type="text" 
                        placeholder="Pesquisar artigos, palestras, temas..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="cormorant"
                    />
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
