import React from 'react';
import './StatsBar.css';

const StatsBar = ({ content }) => {
    if (!content) return null;

    return (
        <div className="stats-bar">
            <div className="container">
                <div className="stats-inner">
                    {content.map((stat, index) => (
                        <div key={index} className={`stat-item reveal reveal-delay-${index}`}>
                            <div className="stat-num">{stat.num}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsBar;
