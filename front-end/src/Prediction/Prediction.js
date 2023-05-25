// Importer les modules et composants nécessaires
import React, { useState } from 'react';
import champions from '../data/champions.json';
import {StyledContainer, StyledAutocomplete,StyledTextField} from "./Prediction-style";
import "./Prediction.css";
import theme from '../theme.js'
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
    Fab,
    Paper,
    CircularProgress
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from "@mui/icons-material/Add";



function Prediction() {
    const navigate = useNavigate();
    const [team1, setTeam1] = useState(Array(5).fill(null));
    const [team2, setTeam2] = useState(Array(5).fill(null));
    const [advancedOptions, setAdvancedOptions] = useState({
        gameDuration: '',
        Team1_baron_first:'',
        Team1_baron_kills: '',
        Team1_kill_first: '',
        Team1_kills: '',
        Team1_dragon_first: '',
        Team1_dragon_kills: '',
        Team1_inhibitor_first: '',
        Team1_inhibitor_kills: '',
        Team1_riftHerald_kills: '',
        Team1_tower_first: '',
        Team1_tower_kills: '',
        Team2_baron_first: '',
        Team2_baron_kills: '',
        Team2_champion_first: '',
        Team2_champion_kills: '',
        Team2_dragon_first: '',
        Team2_dragon_kills: '',
        Team2_inhibitor_first: '',
        Team2_inhibitor_kills: '',
        Team2_riftHerald_kills: '',
        Team2_tower_first: '',
        Team2_tower_kills: '',

    });
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);


    const [isLoading, setIsLoading] = useState(false);


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
        setIsLoading(true);
        // Vérifie que tous les champs de l'équipe sont remplis
        if (team1.some(champ => champ === null) || team2.some(champ => champ === null)) {
            // Si tous les champs ne sont pas remplis, affiche une alerte et retourne
            alert('Veuillez sélectionner les champions pour chaque équipe.');
            return;
        }


        const requestData = {
            team1: team1.map(champion => champion.name),
            team2: team2.map(champion => champion.name),
            advancedOptions: Object.fromEntries(
                Object.entries(advancedOptions)
                    .filter(([key, value]) => value !== '')
            ),
        };

        fetch('/api/winrate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Winrate data:', data);
                // Ici, vous pouvez traiter les données de winrate
                // Par exemple, vous pouvez mettre à jour la barre de progression
                setProgressValue(Math.round(data.probability *100));
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            })
            .finally(() => {
                // Définir isLoading comme false lorsque la requête est terminée, que ce soit avec succès ou en cas d'échec
                setIsLoading(false);
            });

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
                  color= "rgb(240, 230, 210)"
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
                    }}
                />
            </Fab>
            <Typography variant="h1"
                        style={{
                            fontSize: '2vw', // Remplacez '3em' par '3vw'
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                        }}
                        gutterBottom>
                Prédiction de partie
            </Typography>
            <StyledContainer>
            {/* Grille pour afficher les champions et les options */}
            <Grid container spacing={2} justifyContent="center"  >
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom >
                        Equipe 1
                    </Typography>
                    {team1.map((champion, index) => (
                        <StyledAutocomplete
                            size={"small"}
                            key={index}
                            //Provoque un Warning a cause de la façon dont AutoComplete est implémenté voir : https://github.com/mui/material-ui/issues/29727
                            options={champions.filter(
                                (champ) => !team1.includes(champ) && !team2.includes(champ)
                            )}

                            getOptionLabel={(champion) => champion.name}
                            isOptionEqualToValue={(option, value) => {
                                return option.name === value.name;
                            }}
                            renderOption={(props, option, { selected }) => (
                                <Box component="li" {...props}>
                                    <img src={option.icon} alt={option.name} style={{ marginRight: '10px', height: '25px', width: '25px' }} />
                                    {option.name}
                                </Box>
                            )}
                            PaperComponent={({ children }) => (
                                <Paper>{children}</Paper>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    required={true}
                                    {...params}
                                    label={`Champion ${index + 1}`}
                                    variant="filled"
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
                            filterSelectedOptions
                            sx={{ marginBottom: '16px'}}
                        />
                    ))}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom>
                        Equipe 2
                    </Typography>
                    {team2.map((champion, index) => (
                        <StyledAutocomplete
                            size={"small"}
                            key={index}
                            //Provoque un Warning a cause de la façon dont AutoComplete est implémenté voir : https://github.com/mui/material-ui/issues/29727
                            options={champions.filter(
                                (champ) => !team1.includes(champ) && !team2.includes(champ)
                            )}
                            filterSelectedOptions
                            isOptionEqualToValue={(option, value) => {
                                return option.name === value.name;
                            }}
                            getOptionLabel={(champion) => champion.name}
                            renderOption={(props, option, { selected }) => (
                                <Box component="li" {...props}>
                                    <img src={option.icon} alt={option.name} style={{ marginRight: '10px', height: '25px', width: '25px' }} />
                                    {option.name}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    required={true}
                                    {...params}
                                    label={`Champion ${index + 1}`}
                                    variant="filled"
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
            <Box mb={4} >

                <div
                    className={`advanced-options-container${
                        showAdvancedOptions ? ' advanced-options-visible' : ''
                    }`}
                >
                    <Typography variant="h5" gutterBottom>
                        Options avancées
                    </Typography>

                    <Grid container spacing={2}>
                        {Object.keys(advancedOptions).map((option) => (
                            <Grid item xs={10} sm={7} md={3} key={option}>
                                <StyledTextField
                                    size={"small"}
                                    label={option}
                                    value={advancedOptions[option]}
                                    onChange={(event) =>
                                        handleAdvancedOptionChange(option, event.target.value)
                                    }
                                    fullWidth
                                    variant="filled"
                                    margin="normal"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Box>
            </StyledContainer>
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
                    bottom: '2vh', // 2% of the viewport height
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '1vh', // 1% of the viewport height
                    backgroundColor: 'white',
                    borderRadius: '0.5vh', // 0.5% of the viewport height
                }}
            >
                <Box
                    // Crée une Box pour la barre de progression, avec une largeur de 50% et une largeur minimale de 1000px.
                    sx={{
                        position: 'relative',
                        width: '50vw', // 50% of the viewport width
                        minWidth: '50vw', // 50% of the viewport width
                        height: '2vh', // 2% of the viewport height
                        backgroundColor: 'white',
                        borderRadius: '0.5vh', // 0.5% of the viewport height
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
                        {        isLoading
                            ? <CircularProgress size={20} />
                            : progressValue === 0
                                ? 'En attente...'
                                : `${progressValue}%`
                        }
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Prediction;

