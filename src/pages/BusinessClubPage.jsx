import React from 'react';
import BusinessClub from '../components/BusinessClub/BusinessClub';

const BusinessClubPage = ({ content }) => {
    return (
        <div className="page-container" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <BusinessClub content={content} />
        </div>
    );
};

export default BusinessClubPage;
