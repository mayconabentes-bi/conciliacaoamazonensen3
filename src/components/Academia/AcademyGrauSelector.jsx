import React from 'react';
import { Shield, Sword, Crown } from 'lucide-react';
import './AcademyGrauSelector.css';

const graus = [
    {
        level: 1,
        name: 'Aprendiz',
        icon: Shield,
        description: 'Conteúdo do 1° Grau',
        color: '#4a90d9'
    },
    {
        level: 2,
        name: 'Companheiro',
        icon: Sword,
        description: 'Conteúdo até o 2° Grau',
        color: '#c9a84c'
    },
    {
        level: 3,
        name: 'Mestre',
        icon: Crown,
        description: 'Acesso completo',
        color: '#d44a4a'
    }
];

const AcademyGrauSelector = ({ userGrau, setUserGrau }) => {
    return (
        <div className="grau-selector-container container">
            <div className="grau-selector">
                <span className="grau-selector-label cinzel">Selecione seu Grau:</span>
                <div className="grau-options">
                    {graus.map((g) => {
                        const Icon = g.icon;
                        const isActive = userGrau === g.level;
                        return (
                            <button
                                key={g.level}
                                className={`grau-option ${isActive ? 'active' : ''}`}
                                onClick={() => setUserGrau(g.level)}
                                style={{ '--grau-color': g.color }}
                                title={g.description}
                            >
                                <Icon size={18} />
                                <span className="grau-name cinzel">{g.name}</span>
                                <span className="grau-level">{g.level}°</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AcademyGrauSelector;
