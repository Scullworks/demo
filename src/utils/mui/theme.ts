import { createTheme, Theme } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

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
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    fontFamily: 'inherit',
                    fontWeight: 500,
                    marginBottom: '3rem'
                }
            }
        },
        MuiDialogContentText: {
            styleOverrides: {
                root: {
                    textAlign: 'center'
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    justifyContent: 'space-around',
                    width: '80%',
                    marginInline: 'auto'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: 'rgb(255, 179, 109)',
                    '&:hover': {
                        backgroundColor: 'rgb(255, 179, 109)'
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgb(245, 253, 254)'
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
        success: {
            main: blue[600]
        },
        info: {
            main: grey[600]
        }
    }
});
