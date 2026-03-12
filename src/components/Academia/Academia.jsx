import React from 'react';
import './Academia.css';
import { Compass, History, Scale, Star, Mic, Users, Book } from 'lucide-react';

const iconMap = {
    Compass: <Compass size={24} />,
    History: <History size={24} />,
    Scale: <Scale size={24} />,
    Star: <Star size={24} />,
    Mic: <Mic size={24} />,
    Users: <Users size={24} />,
    Book: <Book size={24} />
};

const Academia = ({ content }) => {
    const data = content;
    const ARTICLES = data.articles;
    return (
        <section className="academia" id="academia">
            <div className="container">
                <div className="section-header">
                    <div className="section-header-left">
                        <div className="gold-line reveal"><span>{data.tag}</span></div>
                        <h2 className="reveal">Academia <em>Filosófica</em></h2>
                    </div>
                    <a href="#" className="btn-link reveal">Ver todos os artigos →</a>
                </div>

                <div className="articles-grid">
                    {ARTICLES.map((art, index) => (
                        <div key={index} className={`article-card reveal reveal-delay-${index}`}>
                            <div className="article-card-img">
                                <div className="article-card-img-placeholder">
                                    {iconMap[art.icon] || art.icon}
                                </div>
                            </div>
                            <div className="article-card-body">
                                <div className="article-cat">{art.cat}</div>
                                <h3>{art.title}</h3>
                                <p className="article-excerpt">{art.excerpt}</p>
                                <div className="article-meta">
                                    <span>{art.meta[0]}</span>
                                    <span>{art.meta[1]}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Academia;
