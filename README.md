# lolPrediction
Projet de fin d'étude de Licence 
Prediction League of legends
**Table des matières**

# Cahier des charges : Projet de L3 de fin d'étude - Prédictions de parties de League of Legends

## Objectifs

Créer un site web utilisant Symfony et React permettant aux joueurs de simuler une prédiction d'une partie de League of Legends en utilisant un modèle de machine learning (PyTorch).

## Fonctionnalités

1. **Prédiction de l'équipe gagnante** : Les utilisateurs pourront entrer les paramètres d'une partie et le site leur renverra l'équipe la plus probable de gagner.
2. **Recommandation de champions** : Les utilisateurs pourront entrer la liste des champions de leur partie et le site leur recommandera un champion à choisir pour augmenter leurs chances de gagner.
3. **Récupération automatique des données de la partie** : Les utilisateurs pourront entrer leur nom d'utilisateur et le site récupérera automatiquement les données de leur partie.
4. **Prédiction en temps réel** : Les utilisateurs pourront recevoir des prédictions en temps réel sur l'équipe qui pourrait gagner pendant qu'ils jouent une partie.

## Étapes de réalisation

### 1. Développement du site web & Préparation des données

- Utiliser Symfony pour le back-end et React pour le front-end
    
    [Mise en place du site web](https://www.notion.so/Mise-en-place-du-site-web-51c90d5111ee434e8af5ae6fc67e519b)
    
- Créer une interface utilisateur intuitive et facile à utiliser
- Collecter les données de parties de League of Legends en utilisant l'API de Riot Games
- Nettoyer et organiser les données pour les rendre utilisables par le modèle de machine learning

### 2. Création et entraînement du modèle de machine learning & Intégration au Site Web

- Utiliser PyTorch pour créer et entraîner un modèle de machine learning
- Tester et ajuster le modèle pour obtenir une précision satisfaisante
- Intégrer le modèle entraîné au site web en utilisant une API ou une autre méthode appropriée
- Afficher correctement les prédictions du modèle sur le site web

### 3. Améliorations et fonctionnalités supplémentaires

- Ajouter des fonctionnalités supplémentaires, comme la recommandation de champions et la récupération automatique des données de la partie
- Implémenter la prédiction en temps réel pour les parties en cours

### 4. Tests et déploiement

- Tester l'ensemble du site web et des fonctionnalités
- Corriger les bugs et optimiser le site pour offrir une expérience utilisateur agréable
- Déployer le site web sur un serveur adapté

### 5. Documentation et soutenance

- Rédiger une documentation détaillée sur le projet
- Préparer la présentation et la défense du projet devant un jury

# Bibliographie

## Sites web

1. Riot Games API. *Riot Games Developer Portal*. [https://developer.riotgames.com/](https://developer.riotgames.com/)
2. PyTorch. *An open source machine learning framework*. [https://pytorch.org/](https://pytorch.org/)
3. Drafting.gg. Exemple de draft lol en web (1). [https://drafting.gg/draft](https://drafting.gg/draft)
4. Draftlol Exemple de draft lol en web (2). [https://draftlol.dawe.gg/](https://draftlol.dawe.gg/)
