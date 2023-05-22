import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split
import pandas as pd

# Charger le fichier CSV avec pandas
df = pd.read_csv('dataset_Categories.csv')
df = df.replace(True, 1)
df = df.replace(False, 0)

# Séparer les features de la variable cible
X = df.drop('Team1_win', axis=1).values
y = df['Team1_win'].values

# Fractionner les données en ensembles d'entraînement et de test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Convertir les données en tenseurs PyTorch
X_train_tensor = torch.tensor(X_train, dtype=torch.float32)
y_train_tensor = torch.tensor(y_train, dtype=torch.float32)
X_test_tensor = torch.tensor(X_test, dtype=torch.float32)
y_test_tensor = torch.tensor(y_test, dtype=torch.float32)

# Créer des objets DataLoader pour l'entraînement et les tests
train_dataset = TensorDataset(X_train_tensor, y_train_tensor)
test_dataset = TensorDataset(X_test_tensor, y_test_tensor)
batch_size = 64
train_dataloader = DataLoader(train_dataset, batch_size=batch_size)
test_dataloader = DataLoader(test_dataset, batch_size=batch_size)


# Définir l'architecture du modèle
class MyModel(nn.Module):
    def __init__(self, input_size):
        super().__init__()
        self.fc1 = nn.Linear(input_size, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, 1)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x


model = MyModel(input_size=347)
learning_rate = 0.001
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)
loss_fn = torch.nn.BCEWithLogitsLoss()

if __name__ == '__main__':
    num_epochs = 10

    # Boucle d'entraînement
    for epoch in range(num_epochs):
        for batch in train_dataloader:
            # Récupérer les données du batch
            batch_X, batch_y = batch

            # Mettre les données sur le GPU si disponible
            if torch.cuda.is_available():
                batch_X = batch_X.cuda()
                batch_y = batch_y.cuda()

            # Calculer les prédictions
            y_pred = model(batch_X)

            # Calculer la perte
            loss = loss_fn(y_pred.squeeze(), batch_y)

            # Calculer les gradients et mettre à jour les poids
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        # Afficher la perte moyenne pour l'époque actuelle
        print(f"Epoch {epoch + 1}/{num_epochs}, Loss: {loss.item():.4f}")

    # Évaluer le modèle sur les données de test
    model.eval()
    correct = 0
    total = 0

    with torch.no_grad():
        for batch in test_dataloader:
            # Récupérer les données du batch
            batch_X, batch_y = batch

            # Mettre les données sur le GPU si disponible
            if torch.cuda.is_available():
                batch_X = batch_X.cuda()
                batch_y = batch_y.cuda()

            # Calculer les prédictions
            y_pred = model(batch_X)
            y_pred_class = torch.round(torch.sigmoid(y_pred))

            # Mettre à jour les compteurs
            total += batch_y.size(0)
            correct += (y_pred_class.squeeze() == batch_y).sum().item()

    # Afficher l'exactitude du modèle sur les données de test
    accuracy = 100 * correct / total
    print(f"Accuracy: {accuracy:.2f}%")
    torch.save(model.state_dict(), "model.pth")
    print("Saved PyTorch Model State to model.pth")
