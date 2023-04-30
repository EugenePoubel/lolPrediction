import React, { useRef, useState } from 'react';
import './Home.css'; // Créez un fichier Home.css pour gérer le style de la page d'accueil
function Home() {
    const rand = Math.floor(Math.random() * 196) + 1; // Génère un nombre aléatoire entre 1 et 196
    const [currentVideoIndex, setCurrentVideoIndex] = useState(rand);
    const fond = useRef(null);
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

    const [muted, setMuted] = useState(true);

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
                <div  className="video-controls">
                    <button
                        id="muteButton"
                        className="mute-button material-symbols-rounded"
                        onClick={handleMuteToggle}
                    >
                        {muted ? "󠁍volume_off" : "volume_up󠁊"}
                    </button>
                    <button id="video-control-button" className="material-symbols-rounded" onClick={handleNextVideo}>
                        skip_next
                    </button>
                </div>
            </div>
            <button className="custom-mode-button">Mode Custom</button>
        </div>
    );
}

export default Home;
