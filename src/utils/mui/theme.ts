import { createTheme, Theme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const theme: Theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    width: '80vw',
                    maxWidth: '55rem',
                    textAlign: 'left'
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    marginBottom: '2rem'
                }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontSize: '1.4rem',
                    marginTop: '0.5rem'
                }
            }
        }
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        htmlFontSize: 10,
        fontWeightRegular: '500'
    },
    palette: {
        info: {
            main: grey[600]
        }
    }
});
