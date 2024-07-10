import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ListProvider } from './ListProvider';
import './index.css';
// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// ---

const devsChoice = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={devsChoice}>
      <ListProvider>
        <App />
      </ListProvider>
    </ThemeProvider>
  </React.StrictMode>
);
