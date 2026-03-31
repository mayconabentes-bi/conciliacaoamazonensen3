import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import History from '../components/History/History';
import HistoryGeneral from '../components/HistoryGeneral/HistoryGeneral';
import './HistoryPage.css';

const HistoryPage = ({ content }) => {
    const { hash } = useLocation();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('historia');

    useEffect(() => {
        if (hash === '#maconaria-brasil') setActiveTab('brasil');
        else if (hash === '#maconaria-amazonas') setActiveTab('amazonas');
        else if (hash === '#glomam') setActiveTab('glomam');
        else if (hash === '#clube-acacias') setActiveTab('acacias');
        else setActiveTab('historia');
        
        window.scrollTo(0, 0);
    }, [hash]);

    const tabs = [
        { id: 'historia', label: 'História da Maçonaria' },
        { id: 'brasil', label: 'Maçonaria no Brasil' },
        { id: 'amazonas', label: 'Maçonaria no Amazonas' },
        { id: 'glomam', label: 'A GLOMAM' },
        { id: 'acacias', label: 'Clube das Acácias' }
    ];

    const handleTabClick = (tabId) => {
        const hashes = {
            'historia': '',
            'brasil': '#maconaria-brasil',
            'amazonas': '#maconaria-amazonas',
            'glomam': '#glomam',
            'acacias': '#clube-acacias'
        };
        navigate(`/historia${hashes[tabId]}`);
    };

    return (
        <div className="page-container history-page-layout">
            <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="history-grid-layout">
                    <aside className="history-sidebar">
                        <div className="history-sidebar-sticky">
                            <h3 className="cinzel gold-text" style={{ fontSize: '1.25rem', marginBottom: '2rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '1rem' }}>
                                Acervo Histórico
                            </h3>
                            <ul className="history-tabs">
                                {tabs.map(tab => (
                                    <li 
                                        key={tab.id} 
                                        className={activeTab === tab.id ? 'active' : ''}
                                        onClick={() => handleTabClick(tab.id)}
                                    >
                                        {tab.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                    <main className="history-content-area">
                        {activeTab === 'historia' && (
                            <div className="tab-pane-transition">
                                <HistoryGeneral content={content.historyGeneral} />
                                <History content={content.history} />
                            </div>
                        )}
                        {activeTab === 'brasil' && (
                            <div className="tab-pane-transition">
                                <HistoryGeneral content={content.historyBrazil} />
                            </div>
                        )}
                        {activeTab === 'amazonas' && (
                            <div className="tab-pane-transition">
                                <HistoryGeneral content={content.historyAmazonas} />
                            </div>
                        )}
                        {activeTab === 'glomam' && (
                            <div className="tab-pane-transition">
                                <HistoryGeneral content={content.historyGlomam} />
                            </div>
                        )}
                        {activeTab === 'acacias' && (
                            <div className="tab-pane-transition">
                                <HistoryGeneral content={content.clubeAcacias} />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
