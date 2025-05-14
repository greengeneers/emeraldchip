import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import Logo from "../components/Logo"; 
import "../styles/Login.css"; 

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');

    const [user, error] = await logUserIn({ username, password });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-header">
          <Logo />
          <h1 className="brand-name">Emerald Chip</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username*" 
            />
          </div>

          <div className="field">
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password*" 
            />
          </div>

          {!!errorText && <p className="error">{errorText}</p>}

          <button type="submit" className="submit-btn">Log in</button>
          <p className="switch-auth">Ready to make a change? <a href="/sign-up">Sign up</a></p>
        </form>
      </div>

      <div className="auth-right">
        <div className="image-placeholder"></div>
      </div>
    </div>
  );
}
