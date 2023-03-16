import { ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import '@/styles/main.scss';
import { theme } from '@/utils/mui/theme';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />;
        </ThemeProvider>
    );
}
