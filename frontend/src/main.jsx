import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import UserContextProvider from './contexts/CurrentUserContextProvider.jsx';
import ThemeContextProvider from './contexts/ThemeContextProvider.jsx';

import './styles/index.css';
import DonationsProvider from './contexts/DonationsContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <ThemeContextProvider>
      <DonationsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DonationsProvider>
    </ThemeContextProvider>
  </UserContextProvider>
);
