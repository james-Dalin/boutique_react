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

  console.log('📤 Tentative de connexion...');
  console.log('Username:', username);
  console.log('Password:', password);

  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    console.log('Status:', response.status);
    console.log('Response OK?', response.ok);

    // ⚠️ IMPORTANT: Vérifier que la réponse est du JSON
    const text = await response.text();
    console.log('Raw response:', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('❌ Erreur JSON parse:', parseError);
      setError('Réponse invalide du serveur');
      return;
    }

    console.log('Parsed data:', data);

    if (data.success) {
      login(data.user);
      alert(`Bienvenue ${data.user.username}!`);
      setPage('home');
    } else {
      setError(data.error || 'Erreur de connexion');
    }
  } catch (err) {
    console.error('❌ Erreur catch:', err);
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