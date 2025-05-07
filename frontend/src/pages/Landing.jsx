import '../styles/Landing.css';
import Hero from '../components/Landing/Hero.jsx';
import Header from '../components/Landing/Header.jsx';
import Splitter from '../components/Landing/Splitter.jsx';
import About from '../components/Landing/About.jsx';
import Footer from '../components/Landing/Footer.jsx';

const Landing = () => {
  return (
    <div id="landing">
      <Header />
      <Hero />
      <Splitter />
      <About />
      <Splitter />
      <Footer />
    </div>
  );
};

export default Landing;
