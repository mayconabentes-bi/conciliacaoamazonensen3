import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Command, History, GraduationCap, Users, Mail, Settings, ArrowRight } from 'lucide-react';
import './CommandPalette.css';

const COMMANDS = [
  { id: 'hero', label: 'Início', icon: Command, category: 'Navegação' },
  { id: 'historia', label: 'História', icon: History, category: 'Conteúdo' },
  { id: 'academia', label: 'Academia', icon: GraduationCap, category: 'Conteúdo' },
  { id: 'instituto', label: 'Instituto', icon: Users, category: 'Conteúdo' },
  { id: 'nominata', label: 'Nominata', icon: Users, category: 'Institucional' },
  { id: 'contato', label: 'Contato', icon: Mail, category: 'Ações' },
  { id: 'login', label: 'Painel Administrativo', icon: Settings, category: 'Admin', isLink: true, href: '/login' }
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openCommandPalette', handleOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openCommandPalette', handleOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredCommands = COMMANDS.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = (cmd) => {
    setIsOpen(false);
    if (cmd.isLink) {
      navigate(cmd.href);
    } else {
      const homeSections = ['hero', 'intro', 'valores', 'contato'];
      if (homeSections.includes(cmd.id)) {
        if (window.location.pathname !== '/') {
          navigate('/');
        }
        setTimeout(() => {
          const element = document.getElementById(cmd.id === 'hero' ? 'hero' : cmd.id);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 80,
              behavior: 'smooth'
            });
          } else if (cmd.id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        navigate(`/${cmd.id}`);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      if (filteredCommands[selectedIndex]) {
        handleAction(filteredCommands[selectedIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="command-palette-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="command-palette-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="command-palette-search">
              <Search className="search-icon" size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="O que você está procurando? (Dica: História, Academia...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="command-shortcut">ESC para fechar</div>
            </div>

            <div className="command-palette-results">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <div
                    key={cmd.id}
                    className={`command-item ${index === setSelectedIndex ? 'selected' : ''} ${selectedIndex === index ? 'active' : ''}`}
                    onClick={() => handleAction(cmd)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="command-item-info">
                      <cmd.icon size={18} className="command-icon" />
                      <div className="command-text">
                        <span className="command-label">{cmd.label}</span>
                        <span className="command-category">{cmd.category}</span>
                      </div>
                    </div>
                    <ArrowRight size={16} className="command-arrow" />
                  </div>
                ))
              ) : (
                <div className="command-no-results">Nenhum resultado encontrado para "{search}"</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
