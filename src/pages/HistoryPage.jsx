import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import History from '../components/History/History';
import HistoryGeneral from '../components/HistoryGeneral/HistoryGeneral';
import { CONTENT as INITIAL_CONTENT } from '../data/content';
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
        else if (hash === '#reea') setActiveTab('reea');
        else if (hash === '#trajetoria') setActiveTab('trajetoria');
        else setActiveTab('historia');
        
        window.scrollTo(0, 0);
    }, [hash]);

    const tabs = [
        { id: 'historia', label: 'História da Maçonaria' },
        { id: 'brasil', label: 'Maçonaria no Brasil' },
        { id: 'amazonas', label: 'Maçonaria no Amazonas' },
        { id: 'glomam', label: 'A GLOMAM' },
        { id: 'reea', label: 'O Rito (REAA)' },
        { id: 'acacias', label: 'Clube das Acácias' },
        { id: 'trajetoria', label: 'Nossa Trajetória (A Loja)' }
    ];

    const handleTabClick = (tabId) => {
        const hashes = {
            'historia': '',
            'brasil': '#maconaria-brasil',
            'amazonas': '#maconaria-amazonas',
            'glomam': '#glomam',
            'reea': '#reea',
            'acacias': '#clube-acacias',
            'trajetoria': '#trajetoria'
        };
        navigate(`/historia${hashes[tabId]}`);
    };

    return (
        <div className="page-container history-page-layout">
            <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="history-grid-layout">
                    <main className="history-content-area">
                        {activeTab === 'historia' && (
                            <div className="tab-pane-transition">
                                <HistoryGeneral content={content.historyGeneral} />
                            </div>
                        )}
                        {activeTab === 'trajetoria' && (
                            <div className="tab-pane-transition">
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
                                <HistoryGeneral content={
                                    (content.clubeAcacias?.sections?.[0]?.title?.includes('Simbolismo')) 
                                    ? content.clubeAcacias 
                                    : INITIAL_CONTENT.clubeAcacias
                                } />
                            </div>
                        )}
                        {activeTab === 'reea' && (
                            <div className="tab-pane-transition">
                                <HistoryGeneral content={
                                    (content.reea?.sections?.[0]?.title?.includes('Rito')) 
                                    ? content.reea 
                                    : INITIAL_CONTENT.reea
                                } />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
