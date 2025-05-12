import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { registerUser } from "../adapters/auth-adapter";

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

  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');

    if (!username || !password || !email || !name || !zipCode) {
      return setErrorText('All fields are required');
    }

    if (usernameWarning || zipCodeWarning) {
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

    if (name === 'email') setEmail(value);
    if (name === 'name') setName(value);
  };

  return (
    <div className="signup-page">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSubmit} aria-labelledby="create-heading" className="signup-form">
        <h2 id="create-heading" className="signup-form-heading">Create New User</h2>
        
        <label htmlFor="username" className="signup-label">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          autoComplete="off"
          className="signup-input"
        />
        {usernameWarning && <p className="signup-warning">{usernameWarning}</p>}

        <label htmlFor="email" className="signup-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="signup-input"
        />

        <label htmlFor="name" className="signup-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          className="signup-input"
        />

        <label htmlFor="zipCode" className="signup-label">ZIP Code</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={zipCode}
          onChange={handleChange}
          className="signup-input"
        />
        {zipCodeWarning && <p className="signup-warning">{zipCodeWarning}</p>}

        <label htmlFor="password" className="signup-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          autoComplete="off"
          className="signup-input"
        />
        {passwordWarning && <p className="signup-warning">{passwordWarning}</p>}

        <button
          type="submit"
          className="signup-submit-btn"
          disabled={!!usernameWarning || !!zipCodeWarning || !!passwordWarning}
        >
          Sign Up Now!
        </button> 
      </form>

      {!!errorText && <p className="signup-error">{errorText}</p>}

      <p className="signup-login-link">
        Already have an account? <Link to="/login" className="signup-login-anchor">Log in!</Link>
      </p>
    </div>
  );
}
