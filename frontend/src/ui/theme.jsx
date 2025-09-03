import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6C5CE7' },
    secondary: { main: '#00C4B3' },
    background: { default: '#fafafa' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: { defaultProps: { variant: 'contained' } },
    MuiCard: { styleOverrides: { root: { boxShadow: '0 8px 30px rgba(0,0,0,0.05)' } } },
  },
  typography: { fontFamily: 'Inter, Roboto, system-ui, Arial' },
});

export default theme;
