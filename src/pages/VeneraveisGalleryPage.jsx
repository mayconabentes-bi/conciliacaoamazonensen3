import React from 'react';
import VeneraveisGallery from '../components/Veneraveis/VeneraveisGallery';

const VeneraveisGalleryPage = ({ content }) => {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary, #f7f4eb)', paddingTop: '90px' }}>
            <VeneraveisGallery content={content?.veneraveis} />
        </div>
    );
};

export default VeneraveisGalleryPage;
