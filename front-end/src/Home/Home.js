// Importer les modules nécessaires
import * as React from 'react';
import './Home.css'; // Créez un fichier Home.css pour gérer le style de la page d'accueil A noter que je pourrais tout mettre dans index.css

// Importer les composants Material UI
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import SkipNext from '@mui/icons-material/SkipNextRounded';
import VolumeUp from '@mui/icons-material/VolumeUpRounded';
import VolumeDown from "@mui/icons-material/VolumeOffRounded";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FavoritesBox from '../FavoriteBox/FavoriteBox';
import { useNavigate } from 'react-router-dom';


function Home() {
    // Définir les états locaux , Navigation , la vidéo ...
    const [pseudo, setPseudo] = React.useState('');

    const navigate = useNavigate();
    const rand = Math.floor(Math.random() * 196) + 1; // Génère un nombre aléatoire entre 1 et 196
    const [currentVideoIndex, setCurrentVideoIndex] = React.useState(rand);
    const fond = React.useRef(null);
    const [muted, setMuted] = React.useState(true);
    const [volume, setVolume] = React.useState(0);


    // Gestion de la navigation vers la page de prédiction
    const handleCustomModeClick = () => {
        navigate('/prediction');
    };

    // Gestion de la navigation vers la page de Draft
    const handleDraftClick = () => {
        navigate('/draft');
    };

    const handlePseudoSubmit = () => {
        navigate(`/predictionLive/${encodeURIComponent(pseudo)}`);
    };

    // Il y a 196 vidéo
    const handleNextVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % 196);
        if (fond.current) {
            fond.current.pause();
            fond.current.load();
            fond.current.play();
        }
    };

    const handleVolumeDownClick = () => {
        setVolume(0);
        fond.current.volume = 0;
    };

    const handleVolumeUpClick = () => {
        setVolume(70);
        fond.current.volume = 0.7;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handlePseudoSubmit();
        }
    };



    const handleVolumeChange = (event, newValue) => {
            setVolume(newValue);
            fond.current.volume = newValue / 100;
            if (newValue > 0) {
                fond.current.muted = false;
                setMuted(false);
            }
        };

    // Structure du composant Home
    return (
        <div className="home">
            <video ref={fond} className="background-video" autoPlay loop muted>
                <source src={`${process.env.PUBLIC_URL}/video/${currentVideoIndex}.mp4`} type="video/mp4" />
            </video>
            <h1 className="site-title">LolPrediction</h1>

            <div className="input-container">
                <input
                    type="text"
                    className="username-input"
                    placeholder="Entrez votre pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <select className="server-select">
                    <option value="EUW">EUW</option>
                    <option value="NA">NA</option>
                    {/* Ajoutez les autres serveurs ici */}
                </select>
            </div>

            {/* Video Controls */}
            <Box sx={{ width: 300}} className="video-controls">
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <VolumeDown id="muteButton" onClick={handleVolumeDownClick}/>
                    <Slider aria-label="Volume" value={volume} onChange={handleVolumeChange} className="volume-slider" />
                    <VolumeUp id="muteButton" onClick={handleVolumeUpClick}/>
                    <SkipNext onClick={handleNextVideo} id="video-control-button" />
                </Stack>
            </Box>
            <FavoritesBox/>
            <Button
                variant="contained"
                className="custom-mode-button"
                onClick={handleCustomModeClick}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000
                }}
            >
                Mode Custom
            </Button>
            <Button
                variant="contained"
                className="custom-mode-button"
                onClick={handleDraftClick}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '200px',
                    zIndex: 1000
                }}
            >
                Mode Draft
            </Button>
        </div>
    );
}

export default Home;
