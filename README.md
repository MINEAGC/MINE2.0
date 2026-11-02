# Modèle professionnel — Midi Minuit

Un modèle multipage de restaurant pour l’offre **Professionnel (400 €)**. L’univers proposé est celui d’une cantine de saison à Nantes. **Midi Minuit est fictif** : nom, adresse, ville, horaires, coordonnées, textes, carte, prix et visuels servent uniquement de démonstration.

## Ouvrir le site

Ouvre index.html dans un navigateur. Le site est statique, sans installation, abonnement ni bibliothèque externe.

## Pages

- index.html — accueil, cuisine, infos pratiques et accès rapide à la réservation
- carte.html — carte exemple avec onglets accessibles au clavier
- maison.html — présentation du lieu, esprit et horaires
- reservation.html — demande de réservation guidée
- mentions-legales.html — base de mentions légales et note de confidentialité à compléter

## Parcours et fonctions

- Navigation courte : **La carte**, **La maison**, **Réserver**. Sur mobile, le bouton de réservation reste accessible en bas de l’écran.
- La page d’accueil affiche tout de suite le type de cuisine, les horaires, le quartier et l’action de réservation.
- Un sélecteur **Midi / Soir** transforme le message et la photo du hero, puis préselectionne le bon service dans le formulaire de réservation.
- Les onglets de la carte fonctionnent au clic et avec les flèches gauche/droite, Début et Fin du clavier.
- Le formulaire ajuste les heures proposées selon le service, préremplit une date d’ouverture et signale les jours de fermeture.
- Un aperçu de la réservation se met à jour pendant la saisie. Après validation, le site prépare un e-mail avec les informations données.
- Les coordonnées, l’adresse, le nom et la ville se modifient dans un seul fichier : config.js.
- La direction visuelle est volontairement plus pop et graphique : palette bleu électrique, jaune citron et tomate, typographie compacte et formes arrondies.
- Mise en page responsive, navigation clavier, contrastes soignés, liens d’évitement et préférence de réduction des animations.

## À personnaliser avant toute présentation ou mise en ligne

1. Dans config.js, remplace le nom, l’adresse, la ville, le téléphone, l’e-mail, la destination de réservation, le lien cartographique et les jours de fermeture. L’adresse et le numéro fournis sont fictifs.
2. Remplace les horaires dans les pages HTML et dans script.js si les services ou plages de réservation diffèrent.
3. Adapte la carte, les allergènes, les régimes proposés et chaque prix aux vrais plats. Les prix présents sont uniquement des exemples.
4. Remplace les textes d’ambiance et les affirmations d’approvisionnement par des informations vérifiées auprès du restaurant.
5. Remplace les images de démonstration par des photos du restaurant ou des images dont le client possède les droits. Actualise les textes alternatifs avec ce qu’elles représentent réellement.
6. Actualise le titre, la description et les métadonnées de partage dans chaque page HTML.
7. Complète les mentions légales, l’hébergement et la politique de confidentialité avec les informations de l’entreprise et ses outils réels.
8. Vérifie le site sur téléphone et ordinateur, les liens, les coordonnées, la carte et le parcours complet avant publication.

## Limite du formulaire statique

Le site ne reçoit ni ne stocke les demandes sur un serveur. Après validation, le visiteur ouvre un e-mail prérempli et choisit de l’envoyer. Il n’y a ni confirmation automatique, ni contrôle des disponibilités, ni réservation enregistrée. L’adresse de démonstration utilise le domaine réservé .example : change-la dans config.js. Pour une réservation en ligne confirmée automatiquement, raccorde un service ou un serveur et adapte la notice de confidentialité.

## Photographies

Les fichiers optimisés au format WebP sont inclus dans assets/ pour que le site fonctionne sans dépendre d’un serveur d’images externe. Photographies utilisées dans cette démonstration :

- Assiette de poisson — Valeria Boltneva, [Pexels](https://www.pexels.com/photo/fish-served-in-a-restaurant-19615775/)
- Plat de pâtes — Ionut Vlad, [Pexels](https://www.pexels.com/photo/gourmet-pasta-dish-with-vegetables-on-a-table-37439454/)
- Cuisine en action — Willians Huerta, [Pexels](https://www.pexels.com/photo/chef-plating-a-gourmet-dish-in-professional-kitchen-36430089/)
- Salle de bistrot — Bingqian Li, [Pexels](https://www.pexels.com/photo/cozy-french-bistro-interior-with-diners-31517300/)
- Intérieur en bois — Jonathan Borba, [Pexels](https://www.pexels.com/photo/interior-of-restaurant-14590691/)

Consulte la [licence Pexels](https://www.pexels.com/license/) et conserve les crédits. Les visuels ne doivent pas laisser croire que les personnes photographiées recommandent le restaurant.
