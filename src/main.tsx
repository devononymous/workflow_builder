
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store, persistor } from './store';
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);