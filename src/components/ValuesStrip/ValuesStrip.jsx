import React from 'react';
import './ValuesStrip.css';

const ValuesStrip = ({ content, activeIndex, onTabClick }) => {
    const VALUES = content.slides.map(slide => ({
        num: slide.value.substring(0, 1), // Simplificando para o demo ou usando slide.value
        label: slide.value
    }));

    // Se preferir números romanos fixos como no original:
    const ROMANS = ['I', 'II', 'III', 'IV'];

    return (
        <div className="values-strip">
            <div className="container">
                <div className="values-strip-inner" id="valuesStrip">
                    {content.slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`value-tab ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => onTabClick(index)}
                        >
                            <div className="value-tab-num">{ROMANS[index] || index + 1}</div>
                            <div className="value-tab-label">{slide.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ValuesStrip;
