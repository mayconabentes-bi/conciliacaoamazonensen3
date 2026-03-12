import React from 'react';
import './ValuesDeepDive.css';

const ValuesDeepDive = ({ content }) => {
    const data = content;
    const VALUE_CARDS_CONTENT = data.cards;

    const VALUE_CARDS = [
        {
            ...VALUE_CARDS_CONTENT[0],
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 3L4 9v7c0 7.18 5.18 13.9 12 15.56C23.82 29.9 29 23.18 29 16V9L16 3z" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
                    <path d="M11 16l3.5 3.5 7-7" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            ...VALUE_CARDS_CONTENT[1],
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 28s-12-7.58-12-16a8 8 0 0 1 12-6.93A8 8 0 0 1 28 12c0 8.42-12 16-12 16z" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
                </svg>
            )
        },
        {
            ...VALUE_CARDS_CONTENT[2],
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="10" r="5" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
                    <path d="M4 28c0-6.63 5.37-12 12-12s12 5.37 12 12" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
            )
        },
        {
            ...VALUE_CARDS_CONTENT[3],
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M4 20l8-8 5 5 11-11" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 28h24" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            )
        }
    ];

    return (
        <section className="values-section" id="valores">
            <div className="container">
                <div className="values-header">
                    <div className="gold-line reveal" style={{ justifyContent: 'center' }}><span>{data.tag}</span></div>
                    <h2 className="reveal">
                        {data.title.includes('Maçonaria') ? (
                            <>
                                {data.title.split('Maçonaria')[0]}
                                <em style={{ color: 'var(--gold-lt)', fontStyle: 'italic' }}>Maçonaria</em>
                                {data.title.split('Maçonaria')[1]}
                            </>
                        ) : data.title}
                    </h2>
                    <p className="reveal reveal-delay-1">{data.description}</p>
                </div>

                <div className="values-grid">
                    {VALUE_CARDS.map((card, index) => (
                        <div key={index} className={`value-card reveal reveal-delay-${index}`}>
                            <div className="value-card-num">{card.num}</div>
                            <div className="value-card-icon">{card.icon}</div>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            <div className="value-card-note">{card.note}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValuesDeepDive;
