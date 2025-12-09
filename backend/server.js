const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Fonction utilitaire pour lire un JSON
const readJSON = (filename) => {
  try {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
  } catch (error) {
    return [];
  }
};

// GET /products
app.get('/products', (req, res) => {
  const products = readJSON('./products.json');
  res.json(products);
});

// POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readJSON('./users.json');

  // Cherche l'utilisateur
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Succès: On renvoie l'utilisateur (sans le mot de passe)
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } else {
    // Échec
    res.status(401).json({ success: false, error: 'Identifiants incorrects' });
  }
});

app.listen(port, () => {
  console.log(`✅ API running on http://localhost:${port}`);
});
