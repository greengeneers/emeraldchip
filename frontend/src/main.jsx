import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/index.css';
import { UserContextProvider } from './contexts/user-context.jsx';
import { ThemeContextProvider } from './contexts/theme-context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <ThemeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeContextProvider>
  </UserContextProvider>
);
