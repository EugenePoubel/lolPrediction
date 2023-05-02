import React from 'react';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

function FavoritesBox() {
    const [favorites, setFavorites] = React.useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
    const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [newFavorite, setNewFavorite] = React.useState('');
    const [editIndex, setEditIndex] = React.useState(null);

    const handleAddFavorite = () => {
        setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
        setNewFavorite('');
        setIsAddDialogOpen(false);
    };

    const handleEditFavorite = () => {
        setFavorites((prevFavorites) => {
            const newFavorites = [...prevFavorites];
            newFavorites[editIndex] = newFavorite;
            return newFavorites;
        });
        setNewFavorite('');
        setIsEditDialogOpen(false);
    };

    const handleDeleteFavorite = (index) => {
        setFavorites((prevFavorites) => prevFavorites.filter((_, i) => i !== index));
    };

    React.useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <div className="favorites-box">
            <h3>Favoris</h3>
            <List>
                {favorites.map((favorite, index) => (
                    <ListItem key={index} button onClick={() => {
                        setEditIndex(index);
                        setNewFavorite(favorite);
                        setIsEditDialogOpen(true);
                    }}>
                        <ListItemIcon>
                            <FavoriteRoundedIcon className="heart-icon" />
                        </ListItemIcon>
                        <ListItemText primary={favorite} />
                    </ListItem>
                ))}
            </List>
            <Fab color="primary" aria-label="add" onClick={() => setIsAddDialogOpen(true)}>
                <FavoriteRoundedIcon />
            </Fab>
            <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} className="custom-dialog">
                <DialogTitle>Ajouter un favori</DialogTitle>
                <DialogContent>
                    <TextField value={newFavorite} onChange={(event) => setNewFavorite(event.target.value)} fullWidth label="Favori" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                    <Button color="primary" onClick={handleAddFavorite}>Ajouter</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} className="custom-dialog">
                <DialogTitle>Modifier un favori</DialogTitle>
                <DialogContent>
                    <TextField value={newFavorite} onChange={(event) => setNewFavorite(event.target.value)} fullWidth label="Favori" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
                    <Button color="primary" onClick={handleEditFavorite}>Modifier</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FavoritesBox;
