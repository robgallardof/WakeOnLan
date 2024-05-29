"use client";

import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1DB954',
    },
    background: {
      default: '#191414',
    },
    text: {
      primary: '#1DB954',
    },
  },
  typography: {
    fontFamily: 'Fira Code, monospace',
  },
});

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px #1DB954;
  }
  50% {
    box-shadow: 0 0 20px #1DB954;
  }
  100% {
    box-shadow: 0 0 5px #1DB954;
  }
`;

const glowText = keyframes`
  0% {
    text-shadow: 0 0 10px #1DB954;
  }
  50% {
    text-shadow: 0 0 30px #1DB954;
  }
  100% {
    text-shadow: 0 0 10px #1DB954;
  }
`;

const StyledButton = styled(Button)({
  fontSize: '1.25rem',
  padding: '10px 20px',
  '&:focus': {
    animation: `${bounce} 2s infinite`,
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    fontSize: '1.25rem',
    '&:hover fieldset': {
      borderColor: '#1DB954',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1DB954',
      animation: `${glow} 1.5s infinite`,
    },
    color: '#1DB954',
  },
  '& .MuiInputLabel-root': {
    fontSize: '1.25rem',
    color: '#1DB954',
    '&.Mui-focused': {
      color: '#1DB954',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1DB954',
    },
    '&:hover fieldset': {
      borderColor: '#1DB954',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1DB954',
    },
  },
});

const validateMacAddress = (mac: string) => {
  const macFormat = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$|^[0-9A-Fa-f]{12}$|^([0-9A-Fa-f]{2}-){5}[0-9A-Fa-f]{2}$/;
  return macFormat.test(mac);
};

const Home = () => {
  const [macAddress, setMacAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleWake = async () => {
    if (!validateMacAddress(macAddress)) {
      setMessage('Invalid MAC address format. Example: 01:23:45:67:89:AB or 0123456789AB or 01-23-45-67-89-AB');
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
    try {
      const response = await axios.post('/api/wake', { macAddress });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to send WoL packet');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-spotifyBlack text-spotifyGreen p-4">
        <Typography
          variant="h1"
          className="text-5xl mb-8 text-center"
          sx={{
            color: 'white',
            animation: `${glowText} 1.5s infinite`,
          }}
        >
          Wake on LAN
        </Typography>
        <div className="w-full max-w-xs">
          <StyledTextField
            variant="outlined"
            label="MAC Address"
            placeholder="01:23:45:67:89:AB"
            value={macAddress}
            onChange={(e) => setMacAddress(e.target.value)}
            fullWidth
            sx={{ marginBottom: '24px' }}
          />
          <StyledButton variant="contained" color="primary" onClick={handleWake} fullWidth>
            Wake Up
          </StyledButton>
        </div>
        {message && (
          <Typography variant="body1" className="mt-4 text-center" color={isInvalid ? 'error' : 'inherit'}>
            {message}
          </Typography>
        )}
        <footer className="mt-8 text-center">
          <Typography variant="body2" sx={{ color: 'white' }}>
            © {new Date().getFullYear()} Developed by{' '}
            <Link href="https://robertogallardo.dev" target="_blank" rel="noopener noreferrer" sx={{ color: '#1DB954' }}>
              Roberto Gallardo
            </Link>
          </Typography>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Home;
