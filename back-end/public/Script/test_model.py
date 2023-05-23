# Chargez l'état sauvegardé du modèle
import json
import sys
import numpy as np
import torch
from pytorchModel import MyModel

# Créez une nouvelle instance du modèle avec la même architecture
loaded_model = MyModel(input_size=347)

loaded_model.load_state_dict(torch.load("model.pth"))
loaded_model.eval()


def main():
    import pandas as pd
    # Vérification des arguments
    if len(sys.argv) != 4:
        print("Usage: python prediction.py Team1 Team2 AdvancedFeatures")
        return
    # Charger le fichier CSV
    df = pd.read_csv("dataset_Categories.csv")
    # Récupérer les noms de colonnes
    noms_colonnes = df.columns.tolist()
    noms_colonnes.remove("Team1_win")
    Champ1 = sys.argv[1]
    Champ1 = Champ1.split(",")
    Champ2 = sys.argv[2]
    Champ2 = Champ2.split(",")
    AdvancedFeatures = sys.argv[3]
    AdvancedFeatures = json.loads(AdvancedFeatures)
    # Création de la matrice vide
    matrice = {}
    for i in noms_colonnes:
        matrice[i] = 0

    for i in Champ1:
        matrice['Team1_' + i] = 1
    for i in Champ2:
        matrice['Team2_' + i] = 1
    for i in AdvancedFeatures:
        matrice[i] = AdvancedFeatures[i]

    input_data = list(matrice.values())
    input_data = np.array(input_data, dtype=np.float32)

    # Convertir l'entrée en un tenseur PyTorch et ajouter une dimension supplémentaire pour simuler un lot de taille 1
    input_tensor = torch.tensor(input_data, dtype=torch.float32).unsqueeze(0)

    # Si votre modèle est sur GPU, déplacez l'entrée sur GPU également
    if torch.cuda.is_available():
        input_tensor = input_tensor.cuda()

    # Passer l'entrée à travers le modèle chargé
    output = loaded_model(input_tensor)

    # Appliquer la fonction sigmoid pour obtenir la probabilité
    probability = torch.sigmoid(output).item()

    # Convertir la probabilité en classe en utilisant un seuil
    predicted_class = 1 if probability >= 0.5 else 0
    result = {"probability": probability, "predicted_class": predicted_class}
    result_json = json.dumps(result)
    print(result_json)


main()