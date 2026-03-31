import React from 'react';
import Nominata from '../components/Nominata/Nominata';

const NominataPage = ({ content }) => {
    return (
        <div className="page-container" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <section id="nominata" style={{ paddingTop: '40px' }}>
                <Nominata content={content.nominata} />
            </section>
        </div>
    );
};

export default NominataPage;
