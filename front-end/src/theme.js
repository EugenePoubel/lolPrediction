import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#C8AA6E',
            dark: '#785A28',
        },
        secondary: {
            main: '#C8AA6E',
            dark: '#785A28',
        },
        text: {
            primary: '#C8AA6E',
            secondary: '#785A28',
        },
        background: {
            default: '#1E2328',
            paper: '#1E282D',
        },
    },
    typography: {
        fontFamily: 'Spiegel, Arial, sans-serif',
        h1: {
            fontFamily: 'Beaufort, Arial, serif',
            fontWeight: 'bold',
            fontSize: '40px',
            letterSpacing: '50',
            lineHeight: '42px',
            color: 'rgb(200, 155, 60)',
        },
        h2: {
            fontFamily: 'Beaufort, Arial, serif',
            fontWeight: 'bold',
            fontSize: '28px',
            letterSpacing: '50',
            lineHeight: '32px',
        },
        h3: {
            fontFamily: 'Beaufort, Arial, serif',
            fontWeight: 'bold',
            fontSize: '23px',
            letterSpacing: '50',
            lineHeight: '28px',
        },
        h4: {
            fontFamily: 'Beaufort, Arial, serif',
            fontWeight: 'bold',
            fontSize: '18px',
            letterSpacing: '50',
            lineHeight: '22px',
        },
        h5: {
            fontFamily: 'Beaufort, Arial, serif',
            fontWeight: 'bold',
            fontSize: '20px',
            letterSpacing: '75',
            lineHeight: '18px',
            padding: '5px',
        },
        body1: {
            fontFamily: 'Spiegel, Arial, sans-serif',
            fontWeight: 'normal',
            fontSize: '14px',
            letterSpacing: '25',
            lineHeight: '20px',
        },
        subtitle1: {
            fontFamily: 'Spiegel, Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '11px',
            letterSpacing: '50',
            lineHeight: '16px',
        },
        h6: {
            fontFamily: 'Beaufort, Arial, serif',
            fontWeight: 'medium',
            fontSize: '57px',
            letterSpacing: '25',
            lineHeight: '62px',
        },
        subtitle2: {
            fontFamily: 'Beaufort, Arial, serif',
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: '50',
            lineHeight: '20px',
        },
    },
});

export default theme;
