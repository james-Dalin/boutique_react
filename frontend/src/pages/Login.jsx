import { userState, userContext, useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import './login.css';

export default function Login({ setPage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(CartContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                login(data.user);
                alert(`Bienvenue ${data.user.username}!`);
                setPage('home');
            } else {
                setError(data.error || 'Erreur de connexion');
            }
        } catch (err) {
            setError('Erreur réseau. Vérifiez que le backend tourne.');
        }
    };

    return (
        <div className="login-container">
            <h2>🔐 Connexion</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Utilisateur:</label>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="admin"
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe:</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='password123'
                        />
                </div>

                {error && <p className="error-msg">{error}</p>}

                <button type="submit" className="login-btn">Se connecter</button>
            </form>
            <p className="hint">Astuce: admin / password123</p>
        </div>
    );
}