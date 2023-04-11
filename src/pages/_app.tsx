import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { theme } from '@/utils/mui/theme';
import type { AppProps } from 'next/app';
import '@/styles/main.scss';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            staleTime: Infinity,
            cacheTime: Infinity
        }
    }
});

export default function App({ Component, pageProps, router }: AppProps) {
    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Component {...pageProps} key={router.asPath} />
                    </LocalizationProvider>
                </AnimatePresence>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
