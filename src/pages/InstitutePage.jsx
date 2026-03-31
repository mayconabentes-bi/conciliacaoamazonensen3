import React from 'react';
import Instituto from '../components/Instituto/Instituto';

const InstitutePage = ({ content }) => {
    return (
        <div className="page-container" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <section id="instituto">
                <Instituto content={content.institute} />
            </section>
        </div>
    );
};

export default InstitutePage;
