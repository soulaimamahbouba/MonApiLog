const produits = [
  { nom: 'Clavier', prix: 45 },
  { nom: 'Écran', prix: 320 },
  { nom: 'Souris', prix: 25 },
];

// 1. Déstructurer le nom et le prix du premier produit.
const { nom, prix } = produits[0];
console.log(nom, prix);

// 2. Trouver la Souris et afficher son prix.
const souris = produits.find((produit) => produit.nom === 'Souris');
console.log(souris.prix);

// 3. Garder les produits dont le prix est inférieur à 100.
const produitsAbordables = produits.filter((produit) => produit.prix < 100);
console.log(produitsAbordables);

// 4. Appliquer une remise de 10 %.
const avecRemise = (prix) => prix * 0.9;
console.log(avecRemise(320));
