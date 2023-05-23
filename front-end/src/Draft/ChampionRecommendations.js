import React, { useState } from 'react';
import { Button, Grid, Typography, Fab, TextField, ThemeProvider, Avatar,IconButton,Card,CardContent,Box } from '@mui/material';
import notFound from '../assets/notfound.png'
function ChampionRecommendations({champions, goodWith, strongAgainst}) {
    const [selectedChampionIndexGoodWith, setSelectedChampionIndexGoodWith] = useState(0);
    const [selectedChampionIndexStrongAgainst, setSelectedChampionIndexStrongAgainst] = useState(0);

    const renderRecommendations = (list, selectedIndex) => {
        if (list.length === 0) {
            return null;
        }

        const item = list[selectedIndex];
        const championName = Object.keys(item)[0];
        const recommendedChampions = Object.values(item)[0];

        if (recommendedChampions.length === 0) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <img src={notFound} alt="Not found"  style={{width: 100, height: 100}} />
                    <Typography variant="body2" align="center">
                        Aucun Champion trouvée / il y a déjà un adversaire dans l'équipe
                    </Typography>
                </Box>

            );
        }

        return (
            <Box display="flex" justifyContent="center" flexWrap="wrap">
                {recommendedChampions.map((recommendedChampionName) => {
                    const recommendedChampion = champions.find(champ => champ.id === recommendedChampionName);
                    return (
                        recommendedChampion &&
                        <Box m={1} key={recommendedChampionName}>
                            <img src={recommendedChampion.icon}
                                 alt={recommendedChampionName}
                                 style={{width: 60, height: 60}}/>
                            <Typography variant="body2" align="center">
                                {recommendedChampionName}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        );
    };




    const renderChampionIcons = (championList, setSelectedChampionIndex, selectedChampionIndex) => {
        return (
            <Box display="flex" justifyContent="center" flexWrap="wrap">
                {championList.map((item, index) => {
                    const championName = Object.keys(item)[0];
                    const champion = champions.find(champ => champ.id === championName);

                    return (
                        <Box key={index} m={1}>
                            {champion && (
                                <IconButton onClick={() => setSelectedChampionIndex(index)}>
                                    <img src={champion.icon} alt={championName}
                                         style={{
                                             width: 50,
                                             height: 50,
                                             border: index === selectedChampionIndex ? '2px solid rgb(200, 155, 60)' : '2px solid transparent'
                                         }}/>
                                </IconButton>

                            )}
                        </Box>
                    );
                })}
            </Box>
        );
    };



    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardContent>
                        {renderChampionIcons(goodWith, setSelectedChampionIndexGoodWith, selectedChampionIndexGoodWith)}
                        <Typography variant="h5" component="h2">
                            Bon avec : {goodWith[selectedChampionIndexGoodWith] ? Object.keys(goodWith[selectedChampionIndexGoodWith])[0] : ''}
                        </Typography>
                        {renderRecommendations(goodWith, selectedChampionIndexGoodWith)}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardContent>
                        {renderChampionIcons(strongAgainst, setSelectedChampionIndexStrongAgainst, selectedChampionIndexStrongAgainst)}
                        <Typography variant="h5" component="h2">
                            Bon contre : {strongAgainst[selectedChampionIndexStrongAgainst] ? Object.keys(strongAgainst[selectedChampionIndexStrongAgainst])[0] : ''}
                        </Typography>
                        {renderRecommendations(strongAgainst, selectedChampionIndexStrongAgainst)}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default ChampionRecommendations;
