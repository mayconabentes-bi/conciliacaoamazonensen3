import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Admin.css';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
            });

            if (error) {
                setErrorMsg('Credenciais inválidas. Tente novamente.');
                console.error("Login error:", error.message);
            } else if (data.session) {
                onLogin(true);
            }
        } catch (err) {
            setErrorMsg('Erro de conexão ao servidor.');
        } finally {
            setLoading(false);
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
                    {errorMsg && <div style={{ color: '#ff4d4f', marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem' }}>{errorMsg}</div>}
                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            placeholder="admin@exemplo.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            placeholder="••••"
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Acessando...' : 'Acessar Painel'}
                    </button>
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
