import React from 'react';
import AcademyDashboard from './AcademyDashboard';
import './AcademyPortal.css';

const AcademyPortal = ({ content }) => {
    return (
        <section id="academia-portal" className="academia-portal-section">
            <AcademyDashboard content={content} />
        </section>
    );
};

export default AcademyPortal;
