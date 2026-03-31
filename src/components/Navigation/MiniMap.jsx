import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MiniMap.css';

const sections = [
  { id: 'hero', label: 'Início' },
  { id: 'intro', label: 'Introdução' },
  { id: 'valores', label: 'Valores' },
  { id: 'historia', label: 'História' },
  { id: 'academia', label: 'Academia' },
  { id: 'instituto', label: 'Instituto' },
  { id: 'nominata', label: 'Nominata' },
  { id: 'contato', label: 'Contato' }
];

const MiniMap = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { pathname } = useLocation();

  if (pathname !== '/') return null;

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mini-map-container">
      <div className="mini-map-track">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`mini-map-dot-wrapper ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => scrollToSection(section.id)}
          >
            <span className="mini-map-label">{section.label}</span>
            <div className="mini-map-dot"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniMap;
