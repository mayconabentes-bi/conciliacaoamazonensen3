import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useReveal = () => {
    const location = useLocation();

    useEffect(() => {
        const revealEls = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    revealObserver.unobserve(e.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        // Add a small delay to ensure React has fully rendered the new DOM elements from hash routing
        setTimeout(() => {
            const freshRevealEls = document.querySelectorAll('.reveal:not(.visible)');
            freshRevealEls.forEach(el => revealObserver.observe(el));
        }, 100);

        // Stagger children in grids
        document.querySelectorAll('.values-grid, .articles-grid, .instituto-projects, .history-general-body, .attributes-grid').forEach(grid => {
            Array.from(grid.children).forEach((child, i) => {
                child.style.transitionDelay = `${i * 0.1}s`;
            });
        });

        return () => {
            revealEls.forEach(el => revealObserver.unobserve(el));
        };
    }, [location.pathname, location.hash]);
};
