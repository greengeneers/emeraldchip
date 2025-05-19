import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { registerUser } from "../adapters/auth-adapter";
import Logo from "../components/Logo";
import "../styles/Login.css";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [usernameWarning, setUsernameWarning] = useState('');
  const [zipCodeWarning, setZipCodeWarning] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [emailWarning, setEmailWarning] = useState('');

  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');

    if (!username || !password || !email || !name || !zipCode) {
      return setErrorText('All fields are required');
    }

    if (usernameWarning || zipCodeWarning || passwordWarning || emailWarning) {
      return setErrorText('Please fix fields before submitting');
    }

    const [user, error] = await registerUser({
      username,
      password,
      email,
      name,
      zip_code: zipCode,
    });

    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'username') {
      if (value.length < 3) {
        setUsernameWarning('Username must be at least 3 characters long');
      } else if (value.length > 15) {
        setUsernameWarning('Username must not exceed 15 characters');
      } else {
        setUsernameWarning('');
      }
      setUsername(value);
    }

    if (name === 'zipCode') {
      if (!/^\d*$/.test(value)) {
        setZipCodeWarning('ZIP code must contain only numbers');
      } else if (value.length !== 5) {
        setZipCodeWarning('ZIP code must be exactly 5 characters long');
      } else {
        setZipCodeWarning('');
      }
      setZipCode(value);
    }

    if (name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(value)) {
        setPasswordWarning(
          'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character'
        );
      } else {
        setPasswordWarning('');
      }
      setPassword(value);
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        setEmailWarning('Please enter a valid email address');
      } else {
        setEmailWarning('');
      }

      setEmail(value);
    }

    if (name === 'name') setName(value);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-header">
          <Logo />
          <h1 className="brand-name">Emerald Chip</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="username"
            placeholder="Username *"
            autoComplete="off"
            value={username}
            onChange={handleChange}
            required
          />
          {usernameWarning && <p className="error">{usernameWarning}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email *"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            required
          />
          {emailWarning && <p className="error">{emailWarning}</p>}

          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            autoComplete="name"
            value={name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="zipCode"
            placeholder="ZIP Code *"
            autoComplete="postal-code"
            value={zipCode}
            onChange={handleChange}
            required
          />
          {zipCodeWarning && <p className="error">{zipCodeWarning}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password *"
            autoComplete="new-password"
            value={password}
            onChange={handleChange}
            required
          />
          {passwordWarning && <p className="error">{passwordWarning}</p>}

          {!!errorText && <p className="error">{errorText}</p>}

          <button
            type="submit"
            className="submit-btn"
            disabled={
              !!usernameWarning ||
              !!zipCodeWarning ||
              !!passwordWarning ||
              !!emailWarning
            }
          >
            Sign Up Now!
          </button>

          <p className="switch-auth">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>

      <div className="auth-right">
        {}
      </div>
    </div>
  );
}
