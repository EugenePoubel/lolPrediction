// Importer les modules nécessaires
import React from 'react';
// Importer les composants Material UI
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function FavoritesBox() {
    // Définir les états locaux pour les favoris, les boîtes de dialogue et autres variables

    const [favorites, setFavorites] = React.useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
    const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [newFavorite, setNewFavorite] = React.useState('');
    const [editIndex, setEditIndex] = React.useState(null);

    // Fonctions pour gérer l'ajout, la modification et la suppression des favoris
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
            {/* Afficher le titre "Favoris" */}
            <h3>Favoris</h3>

            {/* Afficher la liste des favoris */}
            <List>
                {/* Itérer sur chaque élément favori et afficher un ListItem pour chacun */}
                {favorites.map((favorite, index) => (
                    <ListItem key={index}
                              secondaryAction={
                                  // Ajouter un bouton pour supprimer un favori
                                  <IconButton edge="end" aria-label="comments" onClick={() => handleDeleteFavorite(index)}>
                                      <DeleteIcon />
                                  </IconButton>
                              }
                    >
                        {/* Afficher une icône de cœur à gauche du texte */}
                        <ListItemIcon>
                            <FavoriteRoundedIcon className="heart-icon" />
                        </ListItemIcon>

                        {/* Afficher le texte du favori */}
                        <ListItemText primary={favorite} />
                    </ListItem>
                ))}
            </List>

            {/* Ajouter un bouton flottant pour ouvrir la boîte de dialogue d'ajout de favori */}
            <Fab size="small" color="primary" aria-label="add" onClick={() => setIsAddDialogOpen(true)}>
                <AddIcon />
            </Fab>

            {/* Créer la boîte de dialogue d'ajout de favori */}
            <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} className="custom-dialog">
                <DialogContent>
                    {/* Ajouter un champ de texte pour entrer un nouveau favori */}
                    <TextField value={newFavorite} onChange={(event) => setNewFavorite(event.target.value)} fullWidth label="Favori" />
                </DialogContent>
                <DialogActions>
                    {/* Ajouter des boutons pour annuler ou ajouter un favori */}
                    <Button onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                    <Button color="primary" onClick={handleAddFavorite}>Ajouter</Button>
                </DialogActions>
            </Dialog>

            {/* Créer la boîte de dialogue de modification de favori */}
            <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} className="custom-dialog">
                <DialogContent>
                    {/* Ajouter un champ de texte pour modifier un favori existant */}
                    <TextField value={newFavorite} onChange={(event) => setNewFavorite(event.target.value)} fullWidth label="Favori" />
                </DialogContent>
                <DialogActions>
                    {/* Ajouter des boutons pour annuler ou modifier un favori */}
                    <Button onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
                    <Button color="primary" onClick={handleEditFavorite}>Modifier</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

// Exporter le composant FavoritesBox pour qu'il puisse être utilisé ailleurs
export default FavoritesBox;
