const { estNonVide, estEmailValide } = require('../utils/validators');

const users = [
  { id: 1, name: 'Aya', email: 'aya@example.com' },
  { id: 2, name: 'Ali', email: 'ali@example.com' },
  { id: 3, name: 'Youssef', email: 'youssef@example.com' },
];
let prochainId = 4;

const getAllUsers = (req, res) => {
  const { name } = req.query;
  const resultat = name ? users.filter((user) => user.name === name) : users;
  res.status(200).json(resultat);
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }

  res.status(200).json(user);
};

const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!estNonVide(name)) {
    return res.status(400).json({ error: 'Le nom est obligatoire' });
  }

  if (!estEmailValide(email)) {
    return res.status(400).json({ error: "L'adresse email est invalide" });
  }

  const nouvelUtilisateur = {
    id: prochainId++,
    name: name.trim(),
    email: email.trim(),
  };
  users.push(nouvelUtilisateur);

  res.status(201).json({ message: 'Utilisateur créé', user: nouvelUtilisateur });
};

module.exports = { getAllUsers, getUserById, createUser };
