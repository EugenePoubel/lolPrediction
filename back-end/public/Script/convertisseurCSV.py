import csv
import os
import json
import pandas as pd

data = pd.read_csv('dataset.csv')
Champions_Names = []
with open('newChampions.json', 'r', encoding='utf-8') as file:
    champions = json.load(file)
    for champ in champions["data"]:
        Champions_Names.append(champions["data"][str(champ)]["id"])

# création features champions team 1
prefix = 'Team1_'
Team1_Champion = [prefix + x for x in Champions_Names]

# création features champions team 2
prefix = 'Team2_'
Team2_Champion = [prefix + x for x in Champions_Names]

Champions_Teams = Team1_Champion + Team2_Champion
# définir les en-têtes de colonnes
en_tetes = ['gameDuration', 'Team1_baron_first', 'Team1_baron_kills', 'Team1_kill_first', 'Team1_kills',
            'Team1_dragon_first', 'Team1_dragon_kills', 'Team1_inhibitor_first', 'Team1_inhibitor_kills',
            'Team1_riftHerald_kills', 'Team1_tower_first', 'Team1_tower_kills', 'Team2_baron_first',
            'Team2_baron_kills', 'Team2_champion_first', 'Team2_champion_kills', 'Team2_dragon_first',
            'Team2_dragon_kills', 'Team2_inhibitor_first', 'Team2_inhibitor_kills', 'Team2_riftHerald_kills',
            'Team2_tower_first', 'Team2_tower_kills', 'Team1_win']
en_tetes += list(Champions_Teams)
print(en_tetes)


# ouvrir le fichier CSV en mode écriture et créer un csv avec les en-têtes
def entete(labels):
    with open('dataset_Categories.csv', 'w', newline='') as f:
        # créer un écrivain CSV
        writer = csv.writer(f)

        # écrire les en-têtes de colonnes
        writer.writerow(labels)


#entete(en_tetes)
# définir le chemin du dossier contenant les fichiers à traiter
chemin_dossier = 'D:\COURS\Projet\Dataset\datasets\scraped\grandmaster\games'
#chemin_dossier = 'D:\COURS\Projet\Dataset\datasets\scraped\challenger\games'

# récupérer la liste des fichiers dans le dossier
liste_fichiers = os.listdir(chemin_dossier)
# parcourir la liste des fichiers
for fichier in liste_fichiers:
    # lire le fichier JSON
    with open(os.path.join(chemin_dossier, fichier), 'r') as f:
        data = json.load(f)

    # créer une liste vide pour stocker les données
    liste_donnees = []
    liste_donnees.append(data['info']['gameDuration'])
    for i in range(2):
        liste_donnees.append(data['info']['teams'][i]['objectives']['baron']['first'])
        liste_donnees.append(data['info']['teams'][i]['objectives']['baron']['kills'])
        liste_donnees.append(data['info']['teams'][i]['objectives']['champion']['first'])
        liste_donnees.append(data['info']['teams'][i]['objectives']['champion']['kills'])
        liste_donnees.append(data['info']['teams'][i]['objectives']['dragon']['first'])
        liste_donnees.append(data['info']['teams'][i]['objectives']['dragon']['kills'])
        liste_donnees.append(data['info']['teams'][i]['objectives']['inhibitor']['first'])
        liste_donnees.append(data['info']['teams'][i]['objectives']['inhibitor']['kills'])
        liste_donnees.append(data['info']['teams'][i]['objectives']['riftHerald']['kills'])
        liste_donnees.append(data['info']['teams'][i]['objectives']['tower']['first'])
        liste_donnees.append(data['info']['teams'][i]['objectives']['tower']['kills'])
    liste_donnees.append(data['info']['teams'][0]['win'])
    # ouvrir le fichier CSV en mode écriture
    with open('dataset_Categories.csv', 'a', newline='') as f:
        # créer un écrivain CSV
        writer = csv.writer(f)

        # écrire les données
        writer.writerow(liste_donnees)

k = 2964
data_Categories = pd.read_csv('dataset_Categories.csv')
# parcourir la liste des fichiers
for fichier in liste_fichiers:
    # lire le fichier JSON
    with open(os.path.join(chemin_dossier, fichier), 'r') as f:
        data = json.load(f)
    for j in range(10):
        if (j < 5):
            if (data['info']['participants'][j]['championName']) == 'FiddleSticks':
                data_Categories.loc[k, 'Team1_Fiddlesticks'] = 1
            else:
                data_Categories.loc[k, 'Team1_' + data['info']['participants'][j]['championName']] = 1
        else:
            if (data['info']['participants'][j]['championName']) == 'FiddleSticks':
                data_Categories.loc[k, 'Team1_Fiddlesticks'] = 1
            else:
                data_Categories.loc[k, 'Team2_' + data['info']['participants'][j]['championName']] = 1
    k += 1

data_Categories.to_csv('dataset_Categories.csv', index=False)
# Charger le fichier CSV
df = pd.read_csv("dataset_Categories.csv")

# Remplacer toutes les valeurs nulles par des 0
df = df.fillna(value=0)

# Enregistrer le nouveau fichier CSV
df.to_csv("dataset_Categories.csv", index=False)
