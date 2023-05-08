import { styled } from '@mui/material/styles';



import {Autocomplete, Container, TextField} from "@mui/material";
import {TextFields} from "@mui/icons-material";



const StyledContainer = styled(Container)({
    padding: '8px',
    borderRadius: '20px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    maxWidth: '70vw',
    overflow: 'hidden',
    boxSizing: 'border-box',


    '& .advanced-options-container': {
        transition: 'all 0.3s ease',
        maxHeight: '0',
        overflow: 'hidden',
        overflowY: 'auto',
    },

    '& .advanced-options-container.advanced-options-visible': {
        maxHeight: '80vh',
    },

    color: '#A09B8C', // Text color using Grey 1

    '& h1': {
        color: '#CDFAFA', // Primary blue color for headings
    },

    '& h2': {
        color: '#0AC8B9', // Blue 2 for secondary headings
    },
});


const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    '& .MuiInputBase-root': {
        fontWeight: 'bold',
        color: '#C8AA6E', // Gold 2 for input text
        background: 'rgba(240, 230, 210, 1)', // Gold 1 for input background
        borderRadius: '20px', // Rounded corners for input
        borderBottom: 'none',
        '&:hover': {
            '& .MuiInputLabel-root':{
                color: '#F0E6D2',
            },
            background: '#C89B3C', // Gold 4 on hover
            color: '#F0E6D2', // Gold 1 for focused input text
        },
        '&.Mui-focused': {
            background: '#C89B3C', // Gold 4 when focused
            color: '#F0E6D2', // Gold 1 for focused input text
        },
    },

    '& .MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined':{
        color: 'black',
    },

    '&  .MuiInputLabel-root':{
        '&.Mui-focused': {
            color: '#F0E6D2', // Gold 1 for focused input text
        },
    },
    '& .MuiAutocomplete-endAdornment button': {
        color: '#A09B8C', // Grey 1 for clear button
    },

    '& .MuiAutocomplete-option': {
        background: '#F0E6D2', // Gold 1 for option background
        color: '#C8AA6E', // Gold 2 for option text
        '&:hover': {
            background: '#C89B3C', // Gold 4 on hover
        },
        '&[aria-selected="true"]': {
            background: '#785A28', // Gold 5 for selected option
        },
    },

    '& .MuiAutocomplete-popupIndicator': {
        color: '#C8AA6E', // Gold 2 for popup indicator
    },

    // Désactive l'animation
    '& .MuiFilledInput-underline:after': {
        borderBottom: 'none',
    },
    '& .MuiFilledInput-underline:before': {
        borderBottom: 'none',
    },
    '& .MuiFilledInput-underline:hover:not(.Mui-disabled):before': {
        borderBottom: 'none',
    },
    '& .MuiFilledInput-underline:hover:not(.Mui-disabled):after': {
        borderBottom: 'none',
    },



}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        fontWeight: 'bold',
        color: '#C8AA6E', // Gold 2 for input text
        background: 'rgba(240, 230, 210, 1)', // Gold 1 for input background
        borderRadius: '20px', // Rounded corners for input
        borderBottom: 'none',
        '&:hover': {
            '& .MuiInputLabel-root':{
                color: '#F0E6D2',
            },
            background: '#C89B3C', // Gold 4 on hover
            color: '#F0E6D2', // Gold 1 for focused input text
        },
        '&.Mui-focused': {
            background: '#C89B3C', // Gold 4 when focused
            color: '#F0E6D2', // Gold 1 for focused input text
        },
    },

    '& .MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined':{
        color: 'black',
    },

    '&  .MuiInputLabel-root':{
        '&.Mui-focused': {
            color: '#F0E6D2', // Gold 1 for focused input text
        },
    },
    // Désactive l'animation
    '& .MuiFilledInput-underline:after': {
        borderBottom: 'none',
    },
    '& .MuiFilledInput-underline:before': {
        borderBottom: 'none',
    },
    '& .MuiFilledInput-underline:hover:not(.Mui-disabled):before': {
        borderBottom: 'none',
    },
    '& .MuiFilledInput-underline:hover:not(.Mui-disabled):after': {
        borderBottom: 'none',
    },
}));



export {StyledContainer,StyledAutocomplete,StyledTextField};
