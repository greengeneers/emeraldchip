import ourMissionImage from '../../assets/images/our-mission.png';
import whyItMattersImage from '../../assets/images/why-it-matters.png';
import howItWorksImage from '../../assets/images/how-it-works.png';

const cards = [
  {
    title: 'Our Mission',
    description:
      'We make e-waste recycling simple, transparent, and accessible. Emerald Chip empowers people to take action toward a cleaner future by connecting them directly with trusted recycling options.',
    image: ourMissionImage,
  },
  {
    title: 'Why It Matters',
    description:
      "E-waste harms our environment when it's not handled properly. By making recycling easier and showing the real outcomes of every donation, we help turn small actions into big impacts.",
    image: whyItMattersImage,
  },
  {
    title: 'How It Works',
    description:
      'Find local recycling events and facilities, log your donations, and track what happens next — all through a single, easy-to-use platform.',
    image: howItWorksImage,
  },
];

const About = () => {
  return (
    <section id="landing-about">
      <div className="about-cards-container">
        {cards.map((card) => (
          <div className="about-card" key={card.title}>
            <h2 className="about-card-title">{card.title}</h2>
            <img
              src={card.image}
              alt={`Image of ${card.title}`}
              className="about-card-image"
            />
            <p className="about-card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
