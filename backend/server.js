 const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Lire les produits depuis products.json
let products = [];
try {
  products = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
} catch (error) {
  console.log('Fichier products.json non trouvé');
}

// ========== ROUTES ==========

// GET /products - Retourne tous les produits
app.get('/products', (req, res) => {
  res.json(products);
});

// POST /login - Authentifier un utilisateur
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, error: 'Username et password requis' });
  }

  // Pour l'instant, accepte n'importe quel login
  return res.json({
    success: true,
    user: {
      id: 1,
      username: username,
      email: `${username}@boutique.com`
    }
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`✅ API running on http://localhost:${port}`);
  console.log(`📌 Products: http://localhost:${port}/products`);
});

