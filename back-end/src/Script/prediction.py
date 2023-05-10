# Chargez l'état sauvegardé du modèle
import torch
import sys
import json



def main():
    # Vérification des arguments
    if len(sys.argv) != 2:
        print('Usage: prediction.py <datafile>')
        sys.exit(1)

    # Lecture des données à partir du fichier JSON
    datafile = sys.argv[1]
    input_data = list(datafile.values())

    # Créez une nouvelle instance du modèle avec la même architecture
    loaded_model = torch.load("model.pth")

    loaded_model.eval()

    # Convertir l'entrée en un tenseur PyTorch et ajouter une dimension supplémentaire pour simuler un lot de taille 1
    input_tensor = torch.tensor(input_data, dtype=torch.float32).unsqueeze(0)

    # Si votre modèle est sur GPU, déplacez l'entrée sur GPU également
    if torch.cuda.is_available():
        input_tensor = input_tensor.cuda()

    # Passer l'entrée à travers le modèle chargé
    output = loaded_model(input_tensor)

    # Appliquer la fonction sigmoid pour obtenir la probabilité
    probability = torch.sigmoid(output).item()

    # Convertir la probabilité en classe en utilisant un seuil (par exemple, 0,5)
    predicted_class = 1 if probability >= 0.5 else 0
    result = {"probability": probability, "predicted_class": predicted_class}
    result_json = json.dumps(result)
    print(result_json)


if __name__ == '__main__':
    main()
