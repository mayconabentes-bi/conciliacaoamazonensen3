import React from 'react';
import './Newsletter.css';

const Newsletter = ({ content }) => {
    if (!content) return null;

    return (
        <div className="newsletter" id="newsletter">
            <div className="container">
                <div className="newsletter-inner">
                    <div className="newsletter-text">
                        <h3>{content.title}</h3>
                        <p>{content.description}</p>
                    </div>
                    <form className="newsletter-form">
                        <input type="email" placeholder={content.placeholder} required />
                        <button type="submit">{content.button}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
