import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ListProvider } from './ListProvider';
import './index.css';
// MUI
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './themes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';
// ---

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <ListProvider>
        <App />
      </ListProvider>
    </ThemeProvider>
  </React.StrictMode>
);
