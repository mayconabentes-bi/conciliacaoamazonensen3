import React from 'react';
import './History.css';
import { resolveAssetUrl } from '../../utils/resolveAssetUrl';

const History = ({ content }) => {
    const data = content;
    const TIMELINE_EVENTS = data.timeline;
    return (
        <section className="history" id="historia">
            <div className="container">
                <div className="history-inner">
                    <div className="history-text">
                        <div className="gold-line reveal"><span>{data.tag}</span></div>
                        <h2 className="reveal">
                            {data.title.split('Tradição')[0]}
                            <em>Tradição</em>
                            {data.title.split('Tradição')[1]}
                        </h2>

                        <div className="history-content-wrapper">
                            {data.image && (
                                <div className="history-featured-image reveal reveal-delay-half">
                                    <img src={resolveAssetUrl(data.image)} alt="História da Loja" />
                                    <div className="history-image-caption">Registro Histórico da Conciliação Amazonense</div>
                                </div>
                            )}

                            <div className="history-paragraphs reveal reveal-delay-1">
                                {data.paragraphs && data.paragraphs.map((p, idx) => (
                                    <p key={idx}>{p}</p>
                                ))}
                            </div>
                        </div>

                        <ul className="history-pillars-list reveal reveal-delay-3">
                            {data.pillars.map((pillar, i) => <li key={i}>{pillar}</li>)}
                        </ul>
                    </div>

                    <div className="timeline">
                        {TIMELINE_EVENTS.map((event, index) => (
                            <div key={index} className={`tl-item reveal reveal-delay-${index}`}>
                                <div className="tl-dot"><div className="tl-dot-inner"></div></div>
                                <div className="tl-body">
                                    <div className="tl-year">{event.year}</div>
                                    <div className="tl-title">{event.title}</div>
                                    <p className="tl-desc">{event.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default History;
