import LandingAbout from '../components/Landing/LandingAbout.jsx';
import LandingHeader from '../components/Landing/LandingHeader.jsx';
import LandingHero from '../components/Landing/LandingHero.jsx';
import LandingSplitter from '../components/Landing/LandingSplitter.jsx';
import '../styles/Landing.css';

const Landing = () => {
  return (
    <div id="landing">
      <LandingHeader />
      <LandingHero />
      <LandingSplitter />
      <LandingAbout />
      <LandingSplitter />
    </div>
  );
};

export default Landing;
