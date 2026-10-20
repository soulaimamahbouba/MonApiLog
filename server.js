const express = require('express');
const app = express();
const PORT = 3000;

// Lire le JSON envoyé dans le corps des requêtes POST.
app.use(express.json());

// Page d'accueil
app.get('/', (req, res) => {
  res.json({ message: "Bonjour, je suis l'API du blog" });
});

// Articles conservés en mémoire jusqu'au redémarrage du serveur.
const articles = [
  { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
  { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
  { id: 3, title: 'Tester une API avec Postman', author: 'Aya' },
];
let prochainId = 4;

// GET /api/articles : liste des articles, avec filtre facultatif par auteur.
app.get('/api/articles', (req, res) => {
  const { author } = req.query;
  const resultat = author
    ? articles.filter((article) => article.author === author)
    : articles;

  res.json({ total: resultat.length, articles: resultat });
});

// GET /api/articles/:id : un article par identifiant.
app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find((item) => item.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }

  res.json(article);
});

// POST /api/articles : création d'un article.
app.post('/api/articles', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Le titre et l\'auteur sont obligatoires' });
  }

  const nouvelArticle = { id: prochainId, title, author };
  prochainId += 1;
  articles.push(nouvelArticle);

  res.status(201).json({ message: 'Article créé', article: nouvelArticle });
});

// Informations de l'application.
app.get('/about', (req, res) => {
  res.json({ name: 'mon-api-blog', version: '1.0.0' });
});

// Utilisateurs en mémoire pour l'exercice du TP.
const users = [
  { id: 1, name: 'Aya', email: 'aya@example.com' },
  { id: 2, name: 'Ali', email: 'ali@example.com' },
  { id: 3, name: 'Youssef', email: 'youssef@example.com' },
];

// GET /api/users : liste des utilisateurs, avec filtre facultatif par nom.
app.get('/api/users', (req, res) => {
  const { name } = req.query;
  const resultat = name
    ? users.filter((user) => user.name === name)
    : users;

  res.json(resultat);
});

// GET /api/users/:id : un utilisateur par identifiant.
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }

  res.json(user);
});

// POST /contact : recevoir un message de contact.
app.post('/contact', (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'L\'email et le message sont obligatoires' });
  }

  res.status(200).json({ message: 'Merci, votre message a été reçu' });
});

app.listen(PORT, () => {
  console.log(`Serveur disponible sur http://localhost:${PORT}`);
});
