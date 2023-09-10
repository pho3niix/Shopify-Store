import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(51, 51, 51)',
    },
    backgroundColor: {
      main: '#202123',
    },
    shoppingCar: {
      main: '#CDBE70',
    },
  },
  typography: {
    fontFamily: 'Avenir',
  },
});
