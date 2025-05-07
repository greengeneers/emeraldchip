import { NavLink } from 'react-router-dom';
import Logo from '../Logo.jsx';

const LandingHeader = () => {
  return (
    <header className="landing-header">
      <div className="logo-title-container">
        <Logo />
        <h1 className="landing-header-title">EmeraldChip</h1>
      </div>

      <div className="landing-header-cta-container">
        <a href="#landing-about" className="landing-header-cta">
          Why?
        </a>
        <NavLink to={'/login'} className={'landing-header-cta'}>
          Log In
        </NavLink>
      </div>
    </header>
  );
};

export default LandingHeader;
