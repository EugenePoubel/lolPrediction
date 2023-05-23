import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Fab, TextField, ThemeProvider, Avatar,IconButton,Card,CardContent } from '@mui/material';
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
import ChampionRecommendations from "./ChampionRecommendations";

function Draft() {

    // Assumons que 'champions' est un tableau qui contient tous les champions disponibles
// avec leurs informations, y compris leurs noms et icônes.
    const [goodWith, setGoodWith] = useState([]);
    const [strongAgainst, setStrongAgainst] = useState([]);

// Ajoutez cette ligne avant le retour du composant Draft
    const [selectedGoodWith, setSelectedGoodWith] = useState(null);
    const [selectedStrongAgainst, setSelectedStrongAgainst] = useState(null)

    const [transformedData, setTransformedData] = useState({ goodWith: [], strongAgainst: [] });
    const [nextSlotTeam1, setNextSlotTeam1] = useState(0);
    const [nextSlotTeam2, setNextSlotTeam2] = useState(0);

    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [advice, setAdvice] = useState([]);
    const [round, setRound] = useState(0);
    const [search, setSearch] = useState('');

    const transformData = (data) => {
        const goodWith = [];
        const strongAgainst = [];

        data.forEach((item) => {
            let iterationCount = 0; // Compteur pour suivre le numéro de l'itération

            if (item.Good_with) {
                const relatedChampions = [];

                Object.entries(item).forEach(([key, value]) => {
                    if (iterationCount > 0) { // Ignorer la première itération
                        relatedChampions.push(key);
                    }

                    iterationCount++;
                });

                goodWith.push({ [item.Good_with]: relatedChampions });
            } else if (item.Strong_against) {
                const counterList = [];

                Object.entries(item).forEach(([key, value]) => {
                    if (iterationCount > 0) { // Ignorer la première itération
                        counterList.push(key);
                    }

                    iterationCount++;
                });

                strongAgainst.push({ [item.Strong_against]: counterList });
            }
        });
        setGoodWith(goodWith);
        setStrongAgainst(strongAgainst);
        return { goodWith, strongAgainst };
    };


// Méthode pour obtenir les conseils de l'API
    const fetchAdvice = async () => {
        // Créer une liste des noms de champions pour chaque équipe
        const team1Names = team1.map(champion => champion.id);
        const team2Names = team2.map(champion => champion.id);

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
        const transformedData = transformData(data);
        setTransformedData(transformedData);
        console.log(transformedData);
    };



    const roleIcons = {
        "Top": topIcon,
        "ADC": botIcon,
        "Support": supportIcon,
        "Mid": midIcon,
        "Jungle": jungleIcon,
    };


    const draftOrder = [1, 2, 2, 1, 1, 2, 2, 1, 1, 2]; // Ordre de draft

    useEffect(() => {
        if(team1.length > 0 || team2.length > 0) { // vérifie qu'au moins un champion a été ajouté
            fetchAdvice();
        }
    }, [team1, team2]); // dépendance à l'état de team1 et team2

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
                        <Typography variant="h1">
                            Conseil
                        </Typography>
                        <Grid>

                            <ChampionRecommendations champions={champions} goodWith={goodWith} strongAgainst={strongAgainst} />
                        </Grid>



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
        </ThemeProvider>
    );
}

export default Draft;

