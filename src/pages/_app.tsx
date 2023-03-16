import { ThemeProvider } from '@mui/material';
import { theme } from '@/utils/mui/theme';
import type { AppProps } from 'next/app';
import '@/styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />;
        </ThemeProvider>
    );
}
