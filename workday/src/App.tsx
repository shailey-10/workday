import { Box, ThemeProvider } from '@mui/material';
import './App.css';
import Home from './Views/Home';
import theme from './theme';

function App() {
  
  return (
    <ThemeProvider theme = {theme}>
    <Box>
     <Home />
    </Box>
    </ThemeProvider>
  );
}

export default App;
