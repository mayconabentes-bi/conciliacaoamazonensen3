import React from 'react';
import './HistoryGeneral.css';
import { resolveAssetUrl } from '../../utils/resolveAssetUrl';

const HistoryGeneral = ({ content, id = "historia-maçonaria" }) => {
    if (!content) return null;

    return (
        <section className="history-general" id={id}>
            <div className="container">
                <div className="history-general-inner">
                    <header className="history-general-header reveal">
                        <div className="gold-line"><span>{content.tag}</span></div>
                        <h2 className="cinzel">{content.title}</h2>
                        <p className="history-general-intro cormorant">
                            {content.intro}
                        </p>
                    </header>

                    {content.image && (
                        <div className="history-general-image reveal reveal-delay-2">
                            <img src={resolveAssetUrl(content.image)} alt={content.title} className="featured-image" />
                        </div>
                    )}

                    <div className="history-general-body">
                        {content.sections.map((section, idx) => (
                            <div key={idx} className={`history-general-section reveal reveal-delay-${idx % 4 + 1}`}>
                                <h3 className="cinzel">{section.title}</h3>
                                <div className="history-general-content cormorant">
                                    {section.content.split('\n\n').map((para, pIdx) => (
                                        <p key={pIdx}>{para}</p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {content.attributes && (
                            <div className="history-general-attributes reveal reveal-delay-4">
                                <h3 className="cinzel">Resumo Estrutural (2026)</h3>
                                <div className="attributes-grid">
                                    {content.attributes.map((attr, idx) => (
                                        <div key={idx} className="attribute-item">
                                            <span className="attr-label cinzel">{attr.label}</span>
                                            <span className="attr-value cormorant">{attr.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <footer className="history-general-footer reveal">
                        <p>{content.footer}</p>
                    </footer>
                </div>
            </div>
        </section>
    );
};

export default HistoryGeneral;
