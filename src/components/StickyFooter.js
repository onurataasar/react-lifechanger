import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" textAlign="center">
            <Link color="inherit" href="localhost:3000/Welcome">
                Copyright © LifeChanger
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
function Github() {
    return (
        <Typography variant="body2" color="text.secondary" textAlign="center">
            <Link color="inherit" href="https://github.com/onurataasar/react-lifechanger">
                Github
            </Link>
        </Typography>
    );
}

export default function StickyFooter() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '26.3vh',
            }}
        >
            <CssBaseline />
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
            </Container>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: "#e5155c",
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1" color="white" textAlign="center">
                        Made with love by Onur Ata Asar.
                    </Typography>
                    <Github />
                    <Copyright />

                </Container>
            </Box>
        </Box>
    );
}