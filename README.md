# Gestionnaire de Programmes Installés

Ce projet est un script en JavaScript utilisant Node.js qui permet aux utilisateurs de gérer les programmes installés sur un système Windows. Il utilise la commande WMIC pour lister les programmes et offre diverses fonctionnalités pour faciliter la gestion des applications.

## Fonctionnalités

- **Liste des Programmes Installés** : Affiche tous les programmes installés avec leur nom et version.
- **Identification des Paquets Dangereux** : Permet de définir une liste de "paquets dangereux" pour les mettre en évidence.
- **Sauvegarde au Format JSON** : Enregistre la liste des programmes installés dans un fichier `installed_packages.json`.
- **Suppression de Programmes** : Permet de désinstaller des programmes après confirmation de l'utilisateur.
- **Gestion des Erreurs** : Gère les erreurs potentielles lors de l'exécution des commandes et fournit des messages clairs.

## Prérequis

- [Node.js](https://nodejs.org/) doit être installé sur votre machine.
- Exécution avec des droits d'administrateur pour désinstaller des programmes.

## Installation

1. Clonez le dépôt ou téléchargez le fichier `manage_packages.js`.
2. Ouvrez un terminal et naviguez vers le répertoire contenant le fichier.
3. Installez les dépendances nécessaires :
   ```bash
   npm install
   
## Utilisation
   
   Pour exécuter le script :
   
   bash
   
   node manage_packages.js

## Instructions

    Le script affichera la liste des programmes installés.
    Il identifiera les paquets dangereux selon la liste définie dans le code.
    Il vous demandera d'entrer le nom d'un paquet à supprimer.
    Confirmez la suppression lorsque demandé.
    La liste des programmes sera également sauvegardée dans installed_packages.json.

## Exemple de Paquets Dangereux

Modifiez la variable dangerousPackages dans le script pour ajouter ou supprimer des noms de paquets que vous souhaitez surveiller.
Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une demande de tirage pour toute modification ou ajout.
License

Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.