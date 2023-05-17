import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Fab, TextField, ThemeProvider, Avatar,IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import champions from '../data/champions.json';
import theme from "../theme";
import { useNavigate } from 'react-router-dom';

function Draft() {
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [advice, setAdvice] = useState([]);
    const [round, setRound] = useState(0);
    const [search, setSearch] = useState('');

    // Méthode pour obtenir les conseils de l'API
    const fetchAdvice = async (champion) => {
        const response = await fetch(`/api/draft?champion=${champion}`);
        const data = await response.json();
        setAdvice(data);
    };

    const handleSelection = (team, champion) => {
        if (team === 1) {
            setTeam1([...team1, champion]);
        } else {
            setTeam2([...team2, champion]);
        }
        // Avancer au prochain tour de sélection
        setRound(round + 1);
        // Obtenir des conseils pour le champion sélectionné
        fetchAdvice(champion);
    };

    // Générer une liste de champions non encore sélectionnés
    const availableChampions = champions.filter((champion) => !team1.includes(champion) && !team2.includes(champion));
    const displayedChampions = availableChampions.filter((champion) => champion.name.toLowerCase().startsWith(search.toLowerCase()));

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/');
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
            <div>
                <Typography variant="h1" gutterBottom>
                    Draft de LoL
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={3}>
                        <Typography variant="h2" gutterBottom>Equipe 1</Typography>
                        {team1.map((champion, index) => (
                            <div key={index}>
                                <Avatar alt={champion.name} src={champion.icon} />
                                <Typography variant="h6">{champion.name}</Typography>
                            </div>
                        ))}
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h2" gutterBottom>Champions disponibles</Typography>
                        <TextField
                            variant="outlined"
                            placeholder="Rechercher un champion..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Grid container spacing={2}>
                            {displayedChampions.map((champion) => (
                                <Grid item key={champion.id}>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleSelection(round % 2 === 0 ? 1 : 2, champion)}
                                    >
                                        <Avatar alt={champion.name} src={champion.icon} />
                                    </IconButton>
                                </Grid>
                            ))}
                        </Grid>

                        b n,
                        <Typography variant="h2" gutterBottom>
                            Conseils :
                        </Typography>
                        {advice.map((tip, index) => (
                            <Typography key={index} variant="body1">
                                {tip}
                            </Typography>
                        ))}
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h2" gutterBottom>Equipe 2</Typography>
                        {team2.map((champion, index) => (
                            <div key={index}>
                                <Avatar alt={champion.name} src={champion.icon} />
                                <Typography variant="h6">{champion.name}</Typography>
                            </div>
                        ))}
                    </Grid>

                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default Draft;

