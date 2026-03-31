import React from 'react';
import './AcademyHero.css';

const AcademyHero = () => {
    return (
        <section className="academy-hero cinzel-bg">
            <div className="academy-hero-overlay"></div>
            <div className="container academy-hero-content">
                <span className="academy-hero-tag cinzel">Portal Educacional</span>
                <h1 className="cinzel">Academia Virtual</h1>
                <p className="cormorant">
                    A verdadeira luz brota do estudo incessante. Explore nosso acervo, palestras e artigos para o aprofundamento filosófico na Arte Real.
                </p>
                <div className="academy-hero-deco">
                    <span className="gold-line"></span>
                    <span className="hero-diamond"></span>
                    <span className="gold-line"></span>
                </div>
            </div>
        </section>
    );
};

export default AcademyHero;
