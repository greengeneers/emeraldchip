import { NavLink } from 'react-router-dom';
import heroImage from '../../assets/images/hero.png';

const Hero = () => {
  return (
    <section className="landing-hero">
      <div className="hero-image-container">
        <img src={heroImage} />
      </div>

      <div className="hero-details-container">
        <h1 className="hero-title-container">
          Turn tech waste into <span className="colored-text">emerald</span> ✨
          treasures.
        </h1>

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
