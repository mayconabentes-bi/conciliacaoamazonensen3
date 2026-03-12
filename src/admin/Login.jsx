import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple mock login
        if (credentials.username === 'admin' && credentials.password === '1234') {
            onLogin(true);
        } else {
            alert('Credenciais inválidas. Tente admin / 1234');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>SISTEMA DE GESTÃO</h1>
                    <p>Concíliação Amazonense Nº 3</p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Usuário</label>
                        <input
                            type="text"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            placeholder="admin"
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            placeholder="••••"
                        />
                    </div>
                    <button type="submit" className="login-btn">Acessar Painel</button>
                    <Link to="/" className="back-link" style={{
                        display: 'block',
                        textAlign: 'center',
                        marginTop: '20px',
                        color: 'var(--admin-muted)',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                    }}>
                        ← Voltar ao Site
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
