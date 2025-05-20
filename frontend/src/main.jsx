import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import UserContextProvider from './contexts/CurrentUserContextProvider.jsx';
import DonationsProvider from './contexts/DonationsContextProvider.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <DonationsProvider>
        <App />
      </DonationsProvider>
    </UserContextProvider>
  </BrowserRouter>
);
