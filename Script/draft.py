import csv
import numpy as np

# Création de la liste pour stocker les noms uniques
champions = []

# Ouverture du fichier CSV en mode lecture
with open('dataset.csv', 'r') as fichier_csv:
    # Lecture du contenu du fichier CSV
    lecteur_csv = csv.DictReader(fichier_csv)
    # Parcours de chaque ligne du fichier CSV
    for ligne in lecteur_csv:
        # Récupération du nom de la colonne "nom"
        nom = ligne['Champion1_Name']
        # Si le nom n'est pas déjà dans la liste des noms uniques, on l'ajoute
        if nom not in champions:
            champions.append(nom)

# Affichage de la liste des noms uniques
print(len(champions))

# Création de la matrice vide
matrice = {}
for i in champions:
    matrice[i] = {}
    for j in champions:
        matrice[i][j] = 0

print(matrice['Aatrox']['Ezreal'])