import { createTheme } from '@mui/material';
import { grey, common } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: grey[500],
    },
    secondary: {
      main: '#d975d0',
    },
    text: {
      primary: common.black,
      secondary: grey[400],
    },
    background: {
      default: common.black,
      paper: grey[100],
    },
  },
});
