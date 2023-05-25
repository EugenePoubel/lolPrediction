import React, { useState, useEffect } from 'react';
import champions from '../data/newChampions.json';
import { StyledContainer, StyledAutocomplete, StyledTextField } from "./PredictionLive-style";
import "./PredictionLive.css";
import theme from '../theme.js'
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
import { useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from "@mui/icons-material/Add";

function PredictionLive() {
    const championsArray = Object.values(champions[0]);
    const [summonerId, setSummonerId] = useState(null);
    const [gameInfo, setGameInfo] = useState(null);
    const [championData, setChampionData] = useState(null);
    const [championNames, setChampionNames] = useState([]);
    const [gameData, setGameData] = useState([]);
    const { pseudo } = useParams();
    const [team1Names, setTeam1Names] = useState([]);
    const [team2Names, setTeam2Names] = useState([]);
    const api_key = "RGAPI-5871cd97-79ef-4bc3-a6e4-c06c42668d7a";


    useEffect(() => {
        console.log("API CALL");
        getSummonerId(pseudo, api_key)
            .then(id => {
                return getCurrentGameInfo(id, api_key);
            })
            .then(gameInfo => {
                if (gameInfo) {
                    const namesPromises = gameInfo.participants.map(participant => {
                        return getChampionName(participant.championId);
                    });

                    return Promise.all(namesPromises)
                        .then(names => {
                            return {
                                gameInfo: gameInfo,
                                championNames: names,
                                team1Names: names.slice(0, 5),
                                team2Names: names.slice(5, 10)
                            }
                        });
                } else {
                    alert(pseudo + " is not currently in a game.");
                    return Promise.reject(new Error(pseudo + " is not currently in a game."));
                }
            })
            .then(({ gameInfo, championNames, team1Names, team2Names }) => {
                setGameInfo(gameInfo);
                setChampionNames(championNames);
                setTeam1Names(team1Names);
                setTeam2Names(team2Names);
                handleSubmit(team1Names, team2Names);
            })
            .catch(error => {
                console.error(error);
                // Ajoutez ici votre code pour "arrêter" la page
            });
    }, [])


    const [gameDuration, setGameDuration] = useState(null);

    useEffect(() => {
        if (gameInfo) {
            setGameDuration(gameInfo.gameLength);
        }
        const timerId = setInterval(() => {
            setGameDuration(prevDuration => prevDuration + 1);
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [gameInfo]);


    const getChampionName = (championId) => {
        const champion = championsArray.find(champ => champ.key === championId.toString());
        return champion ? champion.name : null;
    };


    function getSummonerId(summonerName, apiKey) {
        const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => data.id)
            .catch(error => {
                console.error(error);
                return null;
            });
    }

    function getCurrentGameInfo(summonerId, apiKey) {
        const url = `https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${apiKey}`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => {
                console.error(error);
                return null;
            });
    }

    const navigate = useNavigate();
    const [team1, setTeam1] = useState(Array(5).fill(null));
    const [team2, setTeam2] = useState(Array(5).fill(null));
    const [advancedOptions, setAdvancedOptions] = useState({
        gameDuration: '',
        Team1_baron_first: '',
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
    const handleSubmit = (team1Names, team2Names) => {
        setIsLoading(true);
        if (team1Names.some(champ => champ === null) || team2Names.some(champ => champ === null)) {
            return;
        }

        const requestData = {
            team1: team1Names,
            team2: team2Names,
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
                setProgressValue(Math.round(data.probability * 100));
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const [progressValue, setProgressValue] = useState(0);

    const handleBackClick = () => {
        navigate('/');
    };

    const getChampionIcon = (championName) => {
        const champion = championsArray.find(champ => champ.name === championName);
        const championId = champion ? champion.id : null;
        return championId
            ? `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${championId}.png`
            : null;
    };

    const team1Icons = team1Names.map(name => getChampionIcon(name));
    const team2Icons = team2Names.map(name => getChampionIcon(name));

    let gameDurationText = "Loading game info...";
    if (gameDuration !== null) {
        gameDurationText = `Durée de la partie: ${Math.floor(gameDuration / 60)}:${gameDuration % 60 < 10 ? '0' : ''}${gameDuration % 60} (min:sec)`;
    }

    return (
        <ThemeProvider theme={theme}>
            <Fab
                color="rgb(240, 230, 210)"
                aria-label="add"
                onClick={handleBackClick}
                sx={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                }}
            >
                <ChevronLeftIcon
                    sx={{
                        fontSize: '2rem',
                    }}
                />
            </Fab>
            <Typography
                variant="h1"
                style={{
                    fontSize: '2vw',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
                gutterBottom
            >
                Prédiction de partie en live
            </Typography>
            <Typography variant="h3">
                Pseudo: {pseudo}
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={4} container direction="column" alignItems="center">
                    <Typography variant="h5">Équipe 1</Typography>
                    {team1Icons.map((icon, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column-reverse',
                                marginTop: '10px',
                            }}
                        >
                            <img
                                src={icon}
                                alt={team1Names[index]}
                                style={{ width: '80px', height: '80px' }}
                            />
                            <Typography variant="body1" style={{ marginTop: '5px' }}>
                                {team1Names[index]}
                            </Typography>
                        </div>
                    ))}
                </Grid>
                <Grid item xs={4} container direction="column" alignItems="center">
                    <Typography variant="h5">Équipe 2</Typography>
                    {team2Icons.map((icon, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column-reverse',
                                marginTop: '10px',
                            }}
                        >
                            <img
                                src={icon}
                                alt={team2Names[index]}
                                style={{ width: '80px', height: '80px' }}
                            />
                            <Typography variant="body1" style={{ marginTop: '5px' }}>
                                {team2Names[index]}
                            </Typography>
                        </div>
                    ))}
                </Grid>
            </Grid>



            <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
                {gameDurationText}
            </Typography>

            <Box
                sx={{
                    position: 'fixed',
                    bottom: '2vh',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '1vh',
                    backgroundColor: 'white',
                    borderRadius: '0.5vh',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '50vw',
                        minWidth: '50vw',
                        height: '2vh',
                        backgroundColor: 'white',
                        borderRadius: '0.5vh',
                        overflow: 'hidden',
                    }}
                >
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
                        {isLoading
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

export default PredictionLive;
