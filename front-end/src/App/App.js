// Importer les modules nécessaires
import React from 'react';
import './App.css';
import Home from '../Home/Home';
import Prediction from '../Prediction/Prediction';
import Draft from '../Draft/Draft';
// Importer les composants nécessaires pour gérer la navigation
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Fonction du composant principal de l'application
function App() {
    // Utiliser le Router pour gérer la navigation dans l'application
    return (
        <Router>
            {/* Conteneur de l'application */}
            <div className="App">
                {/* Définir les routes et les composants correspondants */}
                <Routes>
                    {/* Route pour la page d'accueil */}
                    <Route path="/" element={<Home />} />
                    {/* Route pour la page de prédiction */}
                    <Route path="/prediction" element={<Prediction />} />
                    {/* Route pour la page de Draft */}
                    <Route path="/draft" element={<Draft />} />
                </Routes>
            </div>
        </Router>
    );
}

// Exporter le composant App pour qu'il puisse être utilisé ailleurs
export default App;
