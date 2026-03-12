import { useEffect } from 'react';

export const useReveal = () => {
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

        revealEls.forEach(el => revealObserver.observe(el));

        // Stagger children in grids
        document.querySelectorAll('.values-grid, .articles-grid, .instituto-projects, .history-general-body, .attributes-grid').forEach(grid => {
            Array.from(grid.children).forEach((child, i) => {
                child.style.transitionDelay = `${i * 0.1}s`;
            });
        });

        return () => {
            revealEls.forEach(el => revealObserver.unobserve(el));
        };
    }, []);
};
