import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

const Hero = ({ content, onSlideChange }) => {
    const HERO_SLIDES = content.slides;
    const [currentSlide, setCurrentSlide] = useState(0);
    const progressRef = useRef(null);
    const autoplayTimer = useRef(null);

    const startAutoplay = () => {
        if (autoplayTimer.current) clearInterval(autoplayTimer.current);

        // Reset progress bar animation
        if (progressRef.current) {
            progressRef.current.style.animation = 'none';
            void progressRef.current.offsetWidth; // trigger reflow
            progressRef.current.style.animation = 'progressBar 5s linear infinite';
        }

        autoplayTimer.current = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
    };

    useEffect(() => {
        const handleSync = (e) => {
            setCurrentSlide(e.detail);
            startAutoplay();
        };
        window.addEventListener('syncHero', handleSync);
        startAutoplay();
        return () => {
            window.removeEventListener('syncHero', handleSync);
            clearInterval(autoplayTimer.current);
        };
    }, []);

    useEffect(() => {
        if (onSlideChange) onSlideChange(currentSlide);
    }, [currentSlide, onSlideChange]);

    const goSlide = (n) => {
        setCurrentSlide(n);
        startAutoplay();
    };

    return (
        <section className="hero" id="hero">
            <div className="hero-geo">
                <svg viewBox="0 0 900 900" fill="none">
                    <polygon points="450,40 820,220 860,450 820,680 450,860 80,680 40,450 80,220" stroke="#c9a84c" strokeWidth="1" fill="none" />
                    <polygon points="450,120 740,265 790,450 740,635 450,780 160,635 110,450 160,265" stroke="#c9a84c" strokeWidth="0.6" fill="none" />
                    <circle cx="450" cy="450" r="80" stroke="#c9a84c" strokeWidth="0.5" fill="none" />
                </svg>
            </div>
            <div className="hero-grad"></div>
            <div className="hero-accent"></div>

            <div className="hero-slides">
                {HERO_SLIDES.map((slide, index) => (
                    <div key={index} className={`hero-slide ${currentSlide === index ? 'active' : ''}`}>
                        <div className="hero-slide-content">
                            <div className="hero-slide-tag">{slide.tag}</div>
                            <h1>
                                {slide.title}
                                <strong>{slide.strong}</strong>
                            </h1>
                            <p>{slide.description}</p>
                            <a href={slide.btnLink} className="hero-slide-btn">
                                {slide.btnText}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hero-controls">
                <div className="hero-dots">
                    {HERO_SLIDES.map((_, index) => (
                        <div
                            key={index}
                            className={`hero-dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goSlide(index)}
                        ></div>
                    ))}
                </div>
                <div className="hero-value-label">{HERO_SLIDES[currentSlide].value}</div>
            </div>

            <div className="hero-scroll">
                <div className="hero-scroll-line"></div>
                <span>Rolar</span>
            </div>

            <div className="hero-progress">
                <div className="hero-progress-bar" ref={progressRef}></div>
            </div>
        </section>
    );
};

export default Hero;
