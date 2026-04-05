import React from 'react';
import './OrbitalLogo.css';
import logoImg from '../../assets/logo-conciliacao.png';

const OrbitalLogo = ({ size = 64 }) => {
    return (
        <div className="orbital-logo-container" style={{ '--logo-size': `${size}px` }}>
            <div className="orbital-rings">
                {/* Aura de Luz (Breathing) */}
                <div className="aura"></div>

                {/* Anel Externo - Sentido Horário Lento */}
                <svg className="ring ring-outer" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" className="path" />
                    
                    {/* Símbolos no Anel Externo */}
                    <g className="symbols">
                        {/* Top: Triângulo/Seta */}
                        <text x="50" y="8" className="symbol-text">▲</text>
                        {/* Direita: Nível (Símbolo estilizado) */}
                        <text x="92" y="53" className="symbol-text">⚖</text>
                        {/* Baixo: Letra L */}
                        <text x="50" y="96" className="symbol-text heavy">L</text>
                        {/* Esquerda: Letra A */}
                        <text x="8" y="53" className="symbol-text heavy">A</text>
                        
                        {/* Diagonais: Ferramentas (Usando glifos próximos ou caminhos) */}
                        <text x="80" y="24" className="symbol-text smaller">◬</text> {/* Esquadro/Compasso */}
                        <text x="80" y="80" className="symbol-text smaller">⚓</text> {/* Prumo */}
                        <text x="20" y="80" className="symbol-text smaller">📐</text> {/* Esquadro */}
                        <text x="20" y="24" className="symbol-text smaller">⌔</text> {/* Compasso */}
                    </g>
                </svg>

                {/* Anel Interno - Sentido Anti-horário Lento */}
                <svg className="ring ring-inner" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" className="path dashed" />
                    <g className="sub-symbols">
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                            <circle 
                                key={i} 
                                cx={50 + 38 * Math.cos((angle * Math.PI) / 180)} 
                                cy={50 + 38 * Math.sin((angle * Math.PI) / 180)} 
                                r="1.5" 
                                className="dot" 
                            />
                        ))}
                    </g>
                </svg>

                {/* Logo Central */}
                <div className="center-logo">
                    <img src={logoImg} alt="Logo" />
                </div>
            </div>
        </div>
    );
};

export default OrbitalLogo;
