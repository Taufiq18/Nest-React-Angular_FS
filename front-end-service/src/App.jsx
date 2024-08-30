import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import CustomerManagement from './components/CustomerManagement';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Red
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: 20 }}>
        <CustomerManagement />
      </div>
    </ThemeProvider>
  );
}

export default App;
