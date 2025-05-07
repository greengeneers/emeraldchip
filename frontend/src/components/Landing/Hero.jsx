import { NavLink } from 'react-router-dom';
import heroImage from '../../assets/images/hero.png';

const Hero = () => {
  return (
    <section className="landing-hero">
      <div className="hero-image-container">
        <img src={heroImage} />
      </div>

      <div className="hero-details-container">
        <h1 className="hero-title">
          Turn tech waste into <span className="colored-text">emerald</span> ✨
          treasures.
        </h1>

        <p className="hero-subtitle">
          Don't let old tech go to waste — Emerald Chip connects you to events
          and facilities that make recycling effortless and meaningful.
        </p>

        <div className="hero-details-cta-container">
          <a className="hero-details-cta" href="#landing-about">
            {' '}
            Learn More
          </a>

          <NavLink to={'/signup'} className={'hero-details-cta'}>
            Get Involved
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
