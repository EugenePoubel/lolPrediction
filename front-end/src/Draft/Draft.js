import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Fab, TextField, ThemeProvider, Avatar,IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import champions from '../data/champions.json';
import theme from "../theme";
import { useNavigate } from 'react-router-dom';

import topIcon from '../icons/top.png';
import botIcon from '../icons/bot.png';
import supportIcon from '../icons/support.png';
import midIcon from '../icons/mid.png';
import jungleIcon from '../icons/jungle.png';
import separator from '../assets/team-player-separator.png';
import contour from  '../assets/player-object-ring.png';

import fondSelectTeam1 from'../assets/equipe1.webm';
import fondSelectTeam2 from'../assets/equipe2.webm';

function Draft() {

    const [nextSlotTeam1, setNextSlotTeam1] = useState(0);
    const [nextSlotTeam2, setNextSlotTeam2] = useState(0);

    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [advice, setAdvice] = useState([]);
    const [round, setRound] = useState(0);
    const [search, setSearch] = useState('');


// Méthode pour obtenir les conseils de l'API
    const fetchAdvice = async () => {
        // Créer une liste des noms de champions pour chaque équipe
        const team1Names = team1.map(champion => champion.name);
        const team2Names = team2.map(champion => champion.name);

        // Créer l'objet à envoyer en POST
        const postData = {
            team1: team1Names.join(','),
            team2: team2Names.join(',')
        };

        // Envoyer une requête à l'API
        const response = await fetch('/api/draft', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        // Récupérer les conseils
        const data = await response.json();

        // Mettre à jour l'état des conseils
        setAdvice(data);
    };



    const roleIcons = {
        "Top": topIcon,
        "ADC": botIcon,
        "Support": supportIcon,
        "Mid": midIcon,
        "Jungle": jungleIcon,
    };


    const draftOrder = [1, 2, 2, 1, 1, 2, 2, 1, 1, 2]; // Ordre de draft

    const handleSelection = (champion) => {
        const team = draftOrder[round];
        if (team === 1 && team1.length < 5) {
            setTeam1([...team1, champion]);
            setNextSlotTeam1(nextSlotTeam1 + 1);
        } else if (team === 2 && team2.length < 5) {
            setTeam2([...team2, champion]);
            setNextSlotTeam2(nextSlotTeam2 + 1);
        } else {
            alert("Une équipe ne peut contenir que 5 champions.");
            return;
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

    const handleDeletion = (team, champion) => {
        if (team === 1) {
            setTeam1(team1.filter((champ) => champ !== champion));
        } else {
            setTeam2(team2.filter((champ) => champ !== champion));
        }
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
                        {[...Array(5)].map((_, index) => (
                            <div key={index}>
                                {index > 0 && index <= team1.length && <img src={separator} alt="separator" style={{width: '100%', height: '8px'}}/>}
                                {index < team1.length ? (
                                    <Grid container direction="row" alignItems="center" spacing={2}>
                                        <Grid item>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleDeletion(1, team1[index])}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    padding: 0
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${contour})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        width: '90%',
                                                        height: '90%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        margin: '5%'
                                                    }}
                                                >
                                                    <Avatar
                                                        alt={team1[index].name}
                                                        src={team1[index].icon}
                                                        sx={{
                                                            width: 80,
                                                            height: 80
                                                        }}
                                                    />
                                                </div>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" component="span">
                                                {team1[index].name}
                                            </Typography>
                                            <br />
                                            <Grid container direction="row" justifyContent="flex-start">
                                                <img src={roleIcons[team1[index].role]} alt={team1[index].role} style={{width: '20px', height: '20px'}}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    index === nextSlotTeam1 && draftOrder[round] === 1  && (
                                        <video autoPlay muted loop style={{width: '100%', height: '100px', objectFit: 'cover'}}>
                                            <source src={fondSelectTeam1} type="video/webm" />
                                        </video>
                                    )
                                )}
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
                        <Grid container spacing={2} style={{maxHeight: "630px", overflowY: "scroll"}}>
                            {displayedChampions.map((champion) => (
                                <Grid item key={champion.id} xs={2}>
                                    <Grid container direction="column" alignItems="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleSelection(champion)}
                                        >
                                            <img alt={champion.name} src={champion.icon} style={{width: 70, height: 70}}/>
                                        </IconButton>
                                        <Typography variant="body2" component="span">
                                            {champion.name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>



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
                        {[...Array(5)].map((_, index) => (
                            <div key={index}>
                                {index > 0 && index <= team2.length && <img src={separator} alt="separator" style={{width: '100%', height: '8px', transform: 'scaleX(-1)'}}/>}
                                {index < team2.length ? (
                                    <Grid container direction="row-reverse" alignItems="center" spacing={2}>
                                        <Grid item>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleDeletion(2, team2[index])}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    padding: 0
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${contour})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        width: '90%',
                                                        height: '90%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        margin: '5%'
                                                    }}
                                                >
                                                    <Avatar
                                                        alt={team2[index].name}
                                                        src={team2[index].icon}
                                                        sx={{
                                                            width: 80,
                                                            height: 80
                                                        }}
                                                    />
                                                </div>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" component="span">
                                                {team2[index].name}
                                            </Typography>
                                            <br />
                                            <Grid container direction="row" justifyContent="flex-end">
                                                <img src={roleIcons[team2[index].role]} alt={team2[index].role} style={{width: '20px', height: '20px'}}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    index === nextSlotTeam2 && draftOrder[round] === 2 && (
                                        <video autoPlay muted loop style={{width: '100%', height: '100px', objectFit: 'cover'}}>
                                            <source src={fondSelectTeam2} type="video/webm" />
                                        </video>
                                    )
                                )}
                            </div>
                        ))}

                    </Grid>
                </Grid>
            </div>
            {advice.map((adviceItem, index) => {
                if(adviceItem.Good_with) {
                    return (
                        <Grid key={index} item xs={2}>
                            <Typography variant="body2" component="span">
                                Bon avec {adviceItem.Good_with} :
                            </Typography>
                            <Grid container direction="row">
                                {Object.entries(adviceItem).map(([championName, value], idx) => {
                                    if (championName !== 'Good_with') {
                                        return (
                                            <Grid item key={idx}>
                                                <img src={champions.find(c => c.name === championName).icon} alt={championName} style={{width: '20px', height: '20px'}}/>
                                                <Typography variant="body2" component="span">
                                                    {championName} ({value})
                                                </Typography>
                                            </Grid>
                                        );
                                    }
                                    return null;
                                })}
                            </Grid>
                        </Grid>
                    );
                } else if(adviceItem.Strong_against) {
                    return (
                        <Grid key={index} item xs={2}>
                            <Typography variant="body2" component="span">
                                Bon contre {adviceItem.Strong_against} :
                            </Typography>
                            <Grid container direction="row">
                                {Object.entries(adviceItem).map(([championName, value], idx) => {
                                    if (championName !== 'Strong_against') {
                                        return (
                                            <Grid item key={idx}>
                                                <img src={champions.find(c => c.name === championName).icon} alt={championName} style={{width: '20px', height: '20px'}}/>
                                                <Typography variant="body2" component="span">
                                                    {championName} ({value})
                                                </Typography>
                                            </Grid>
                                        );
                                    }
                                    return null;
                                })}
                            </Grid>
                        </Grid>
                    );
                }
                return null;
            })}

        </ThemeProvider>
    );
}

export default Draft;

