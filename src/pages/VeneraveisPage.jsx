import React from 'react';
import Veneraveis from '../components/Nominata/Nominata';

const VeneraveisPage = ({ content }) => {
    return (
        <div className="page-container" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <section id="veneraveis" style={{ paddingTop: '40px' }}>
                <Veneraveis content={content.veneraveis} />
            </section>
        </div>
    );
};

export default VeneraveisPage;
