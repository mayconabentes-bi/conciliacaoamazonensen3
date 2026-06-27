import React from 'react';
import { motion } from 'framer-motion';
import '../Nominata/Nominata.css';
import { resolveAssetUrl } from '../../utils/resolveAssetUrl';

const VeneraveisGallery = ({ content }) => {
    if (!content) return null;

    const members = content.members || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <section className="nominata" id="nominata">
            <div className="container">
                <header className="nominata-header reveal">
                    <span className="tag">{content.tag}</span>
                    <h2 className="section-title">{content.title}</h2>
                    <p className="section-description">{content.description}</p>
                </header>

                {members.length > 0 ? (
                    <motion.div
                        className="nominata-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {members.map((member, index) => (
                            <motion.div
                                key={`${member.name}-${index}`}
                                className="member-card"
                                variants={itemVariants}
                            >
                                <div className="member-photo-container">
                                    <div className="member-photo-placeholder">
                                        {member.photo ? (
                                            <img
                                                src={resolveAssetUrl(member.photo)}
                                                alt={member.name}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div className="photo-fallback" style={{ display: member.photo ? 'none' : 'flex' }}>
                                            <span className="initials">{member.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}</span>
                                        </div>
                                        <div className="photo-overlay"></div>
                                    </div>
                                </div>
                                <div className="member-info">
                                    <span className="member-role">{member.role}</span>
                                    <h3 className="member-name">{member.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="nominata-grid" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="member-card" style={{ maxWidth: '520px', textAlign: 'center', padding: '24px' }}>
                            Nenhum irmão cadastrado nesta galeria ainda.
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default VeneraveisGallery;
