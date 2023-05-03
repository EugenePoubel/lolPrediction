// Importer les modules et composants nécessaires
import React, { useState } from 'react';
import champions from '../data/champions.json';
import './Prediction.css';
// Importer les composants Material UI
import {
    LinearProgress,
    Autocomplete,
    createTheme,
    ThemeProvider,
    Container,
    Grid,
    Typography,
    TextField,
    MenuItem,
    Button,
    Box,
    Select,
    InputLabel,
    FormControl,
    Fab
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from "@mui/icons-material/Add";

const theme = createTheme({
    palette: {
        text: {
            primary: 'rgba(66, 133, 244, 1)',
        },
    },
});

function Prediction() {
    const navigate = useNavigate();
    const [team1, setTeam1] = useState(Array(5).fill(null));
    const [team2, setTeam2] = useState(Array(5).fill(null));
    const [advancedOptions, setAdvancedOptions] = useState({
        gameDuration: '',
        team1BaronKills: '',
        team2BaronKills: '',
        team1Kills: '',
        team2Kills: '',
        team1Towers: '',
        team2Towers: '',
        team1Dragons: '',
        team2Dragons: '',
        team1Inhibitors: '',
        team2Inhibitors: '',
        team1Heralds: '',
        team2Heralds: '',
    });
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);


    const handleTeam1Change = (index, value) => {
        setTeam1(value);
    };

    const handleTeam2Change = (index, value) => {
        setTeam2(value);
    };

    const handleAdvancedOptionsClick = () => {
        setShowAdvancedOptions(!showAdvancedOptions);
    };

    const handleAdvancedOptionChange = (option, value) => {
        setAdvancedOptions((prevState) => ({ ...prevState, [option]: value }));
    };

    const handleSubmit = () => {
        console.log('Submit prediction with the following data:', {
            team1,
            team2,
            advancedOptions,
        });
        // Envoyer les données pour prédire la partie
    };

    const [modelVersion, setModelVersion] = useState('V1');
    const [elo, setElo] = useState('Platinium+');

    const [progressValue, setProgressValue] = useState(0);

    const handleBackClick = () => {
        navigate('/');
    };


    const handleSelectChange = (event, setter) => {
        setter(event.target.value);
    };


    return (
        <ThemeProvider theme={theme}>
            <Fab
                color="white"
                  aria-label="add"
                  onClick={handleBackClick}
                  sx={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                  }}>
                <ChevronLeftIcon
                    sx={{
                        fontSize: '2rem', // Ajustez la taille de l'icône ici
                        color: 'rgba(66, 133, 244, 1)',
                    }}
                />
            </Fab>
            <Typography variant="h1"
                        style={{
                            fontSize: '3em',
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: '20px',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                        }}
                        gutterBottom>
                Prédiction de partie
            </Typography>
        <Container className="prediction-container">
            {/* Grille pour afficher les champions et les options */}
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Equipe 1
                    </Typography>
                    {team1.map((champion, index) => (
                        <Autocomplete
                            key={index}
                            options={champions}
                            getOptionLabel={(champion) => champion.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={`Champion ${index + 1}`}
                                    variant="outlined"
                                />
                            )}
                            value={champion}
                            onChange={(event, value) =>
                                handleTeam1Change(index, [
                                    ...team1.slice(0, index),
                                    value,
                                    ...team1.slice(index + 1),
                                ])
                            }
                            sx={{ marginBottom: '16px' }}
                        />
                    ))}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Equipe 2
                    </Typography>
                    {team2.map((champion, index) => (
                        <Autocomplete
                            key={index}
                            options={champions}
                            getOptionLabel={(champion) => champion.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={`Champion ${index + 1}`}
                                    variant="outlined"
                                />
                            )}
                            value={champion}
                            onChange={(event, value) =>
                                handleTeam2Change(index, [
                                    ...team2.slice(0, index),
                                    value,
                                    ...team2.slice(index + 1),
                                ])
                            }
                            sx={{ marginBottom: '16px' }}
                        />
                    ))}
                </Grid>
            </Grid>
            {/* Boutons pour soumettre la prédiction et afficher les options avancées */}
            <Box>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Prédire la partie
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant={showAdvancedOptions ? "outlined" : "contained"}
                            color="secondary"
                            onClick={handleAdvancedOptionsClick}
                        >
                            Prédiction avancée
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {/* Conteneur pour les options avancées */}
            <Box mb={4}>

                <div
                    className={`advanced-options-container${
                        showAdvancedOptions ? ' advanced-options-visible' : ''
                    }`}
                >
                    <Typography variant="h6" gutterBottom>
                        Options avancées
                    </Typography>

                    <Grid container spacing={2}>
                        {Object.keys(advancedOptions).map((option) => (
                            <Grid item xs={12} sm={6} md={4} key={option}>
                                <TextField
                                    label={option}
                                    value={advancedOptions[option]}
                                    onChange={(event) =>
                                        handleAdvancedOptionChange(option, event.target.value)
                                    }
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Box>
            {/* Sélecteurs pour choisir la version du modèle et l'ELO */}
            <Box sx={{ position: 'absolute', bottom: 16, left: 16 }} className="prediction-container">
                <Grid container spacing={2}>
                    <Grid item>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="model-version-select">Modèle</InputLabel>
                            <Select
                                value={modelVersion}
                                onChange={(event) => handleSelectChange(event, setModelVersion)}
                                label="Version du modèle"
                                inputProps={{
                                    name: 'model-version',
                                    id: 'model-version-select',
                                }}
                            >
                                <MenuItem value="V1">V1</MenuItem>
                                {/* Ajoutez d'autres versions du modèle ici */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="elo-select">ELO</InputLabel>
                            <Select
                                value={elo}
                                onChange={(event) => handleSelectChange(event, setElo)}
                                label="ELO"
                                inputProps={{
                                    name: 'elo',
                                    id: 'elo-select',
                                }}
                            >
                                <MenuItem value="Platinium+">Platinium+</MenuItem>
                                {/* Ajoutez d'autres ELO ici */}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            {/* Barre de progression pour afficher l'état de la prédiction */}
            <Box
                // Crée un conteneur Box positionné en bas et centré horizontalement sur la page.
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: 1,
                    backgroundColor: 'white',
                    borderRadius: '4px',
                }}
            >
                <Box
                    // Crée une Box pour la barre de progression, avec une largeur de 50% et une largeur minimale de 1000px.
                    sx={{
                        position: 'relative',
                        width: '50%',
                        minWidth: '1000px',
                        height: '24px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        overflow: 'hidden',
                    }}
                >
                    {/* Affiche la barre de progression en utilisant la valeur de progressValue. */}
                    <LinearProgress
                        variant="determinate"
                        value={progressValue}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                    />
                    <Typography
                        variant="caption"
                        align="center"
                        color="text.secondary"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Affiche "En attente..." si la valeur de la progression est 0, sinon affiche le score de prédiction */}
                        {progressValue === 0 ? 'En attente...' : `${progressValue}%`}
                    </Typography>
                </Box>
            </Box>


        </Container>
        </ThemeProvider>
    );
}

export default Prediction;
