import { ThemeProvider } from '@mui/material';
import { About, ContactUs, Header } from '@/components';
import { theme } from '@/utils/mui/theme';

function Home() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Header />
                <About />
                <ContactUs />
            </ThemeProvider>
        </>
    );
}

export default Home;
