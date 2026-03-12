import React from 'react';
import { motion } from 'framer-motion';
import './Nominata.css';

const Nominata = ({ content }) => {
    if (!content) return null;

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

                <motion.div 
                    className="nominata-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {content.members.map((member, index) => (
                        <motion.div 
                            key={index} 
                            className="member-card"
                            variants={itemVariants}
                        >
                            <div className="member-photo-container">
                                <div className="member-photo-placeholder">
                                    {member.photo && !member.photo.includes('veneravel.jpg') && !member.photo.includes('primeiro_vigilante.jpg') ? (
                                        <img 
                                            src={member.photo} 
                                            alt={member.name} 
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <div className="photo-fallback" style={{ display: member.photo && !member.photo.includes('.jpg') ? 'none' : 'flex' }}>
                                        <span className="initials">{member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
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
            </div>
        </section>
    );
};

export default Nominata;
