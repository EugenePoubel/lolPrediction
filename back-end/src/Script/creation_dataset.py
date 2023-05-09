import json
import os
import csv


# définir une fonction récursive pour obtenir toutes les clés d'un objet JSON
def obtenir_toutes_les_cles(objet_json, prefixe=''):
    liste_cles = []
    if isinstance(objet_json, dict):
        for cle, valeur in objet_json.items():
            nom_cle = f"{prefixe}.{cle}" if prefixe else cle
            liste_cles.append(nom_cle)
            liste_cles += obtenir_toutes_les_cles(valeur, nom_cle)
    elif isinstance(objet_json, list):
        for i, valeur in enumerate(objet_json):
            nom_cle = f"{prefixe}[{i}]"
            liste_cles += obtenir_toutes_les_cles(valeur, nom_cle)
    return liste_cles


# ouvrir le fichier json en mode lecture
with open('Dataset/datasets/scraped/challenger/games/EUW1_6239690230.json', 'r') as f:
    # charger le contenu du fichier dans un objet Python
    data = json.load(f)

# créer une liste de clés pour conserver
cles_a_conserver = [
    'info.gameDuration',
]

for i in range(10):
    prefixe = f'info.participants[{i}]'
    cles_a_conserver += [
        f'{prefixe}.goldEarned',
        f'{prefixe}.inhibitorKills',
        f'{prefixe}.individualPosition',
        f'{prefixe}.championName',
    ]

for i in range(2):
    prefixe = f'info.teams[{i}].objectives'
    cles_a_conserver += [
        f'{prefixe}.baron.first',
        f'{prefixe}.baron.kills',
        f'{prefixe}.champion.first',
        f'{prefixe}.champion.kills',
        f'{prefixe}.dragon.first',
        f'{prefixe}.dragon.kills',
        f'{prefixe}.inhibitor.first',
        f'{prefixe}.inhibitor.kills',
        f'{prefixe}.riftHerald.kills',
        f'{prefixe}.tower.first',
        f'{prefixe}.tower.kills',
    ]

    cles_a_conserver.append(f'info.teams[{i}].win')

# obtenir la liste de toutes les clés de l'objet JSON
liste_toutes_cles = obtenir_toutes_les_cles(data)

# créer une nouvelle liste avec les clés à conserver
nouvelle_liste_cles = [cle for cle in liste_toutes_cles if cle in cles_a_conserver]

# afficher la liste de toutes les clés restantes
print(nouvelle_liste_cles)

# définir les en-têtes de colonnes
en_tetes = ['gameDuration', 'Champion1_Name', 'Champion1_gold', 'Champion1_position', 'Champion2_Name',
            'Champion2_gold', 'Champion2_position', 'Champion3_Name', 'Champion3_gold', 'Champion3_position',
            'Champion4_Name', 'Champion4_gold', 'Champion4_position', 'Champion5_Name', 'Champion5_gold',
            'Champion5_position', 'Champion6_Name', 'Champion6_gold', 'Champion6_position', 'Champion7_Name',
            'Champion7_gold', 'Champion7_position', 'Champion8_Name', 'Champion8_gold', 'Champion8_position',
            'Champion9_Name', 'Champion9_gold', 'Champion9_position', 'Champion10_Name', 'Champion10_gold',
            'Champion10_position', 'Team1_baron_first', 'Team1_baron_kills', 'Team1_kill_first', 'Team1_kills',
            'Team1_dragon_first', 'Team1_dragon_kills', 'Team1_inhibitor_first', 'Team1_inhibitor_kills',
            'Team1_riftHerald_kills', 'Team1_tower_first', 'Team1_tower_kills', 'Team2_baron_first',
            'Team2_baron_kills', 'Team2_champion_first', 'Team2_champion_kills', 'Team2_dragon_first',
            'Team2_dragon_kills', 'Team2_inhibitor_first', 'Team2_inhibitor_kills', 'Team2_riftHerald_kills',
            'Team2_tower_first', 'Team2_tower_kills', 'Team1_win']


# ouvrir le fichier CSV en mode écriture
def entete():
    with open('dataset.csv', 'w', newline='') as f:
        # créer un écrivain CSV
        writer = csv.writer(f)

        # écrire les en-têtes de colonnes
        writer.writerow(en_tetes)


#entete()

# définir le chemin du dossier contenant les fichiers à traiter
#chemin_dossier = 'D:\COURS\Projet\Dataset\datasets\scraped\grandmaster\games'
chemin_dossier = 'D:\COURS\Projet\Dataset\datasets\scraped\challenger\games'

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
    for i in range(10):
        liste_donnees.append(data['info']['participants'][i]['championName'])
        liste_donnees.append(data['info']['participants'][i]['goldEarned'])
        liste_donnees.append(data['info']['participants'][i]['individualPosition'])
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
    with open('dataset.csv', 'a', newline='') as f:
        # créer un écrivain CSV
        writer = csv.writer(f)

        # écrire les données
        writer.writerow(liste_donnees)
