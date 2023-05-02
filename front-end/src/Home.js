import * as React from 'react';
import './Home.css'; // Créez un fichier Home.css pour gérer le style de la page d'accueil

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import SkipNext from '@mui/icons-material/SkipNextRounded';
import VolumeUp from '@mui/icons-material/VolumeUpRounded';
import VolumeDown from "@mui/icons-material/VolumeOffRounded";
import Box from '@mui/material/Box';
import FavoritesBox from './FavoriteBox';

function Home() {
    const rand = Math.floor(Math.random() * 196) + 1; // Génère un nombre aléatoire entre 1 et 196
    const [currentVideoIndex, setCurrentVideoIndex] = React.useState(rand);
    const fond = React.useRef(null);
    const handleMuteToggle = () => {
        const videoElement = document.querySelector(".background-video");
        videoElement.muted = !videoElement.muted;
        setMuted(videoElement.muted);
    };

    const handleNextVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % 196);
        if (fond.current) {
            fond.current.pause();
            fond.current.load();
            fond.current.play();
        }
    };

    const [muted, setMuted] = React.useState(true);
    const [volume, setVolume] = React.useState(0);

    const handleVolumeDownClick = () => {
        setVolume(0);
        fond.current.volume = 0;
    };

    const handleVolumeUpClick = () => {
        setVolume(70);
        fond.current.volume = 0.7;
    };


    const handleVolumeChange = (event, newValue) => {
            setVolume(newValue);
            fond.current.volume = newValue / 100;
            if (newValue > 0) {
                fond.current.muted = false;
                setMuted(false);
            }
        };


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
                />
                <select className="server-select">
                    <option value="EUW">EUW</option>
                    <option value="NA">NA</option>
                    {/* Ajoutez les autres serveurs ici */}
                </select>
            </div>


            <Box sx={{ width: 300}} className="video-controls">
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <VolumeDown id="muteButton" onClick={handleVolumeDownClick}/>
                    <Slider aria-label="Volume" value={volume} onChange={handleVolumeChange} className="volume-slider" />
                    <VolumeUp id="muteButton" onClick={handleVolumeUpClick}/>
                    <SkipNext onClick={handleNextVideo} id="video-control-button" />
                </Stack>
            </Box>

            <FavoritesBox/>
            <button className="custom-mode-button">Mode Custom</button>
        </div>
    );
}

export default Home;
