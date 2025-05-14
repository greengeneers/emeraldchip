import Overview from './Overview.jsx';
import Events from './Events.jsx';
import { FaAward, FaBox, FaCalendar, FaChartPie, FaUser } from 'react-icons/fa6';

export const links = [
  {
    title: 'Overview',
    state: 'overview',
    component: Overview,
    icon: FaChartPie,
  },
  {
    title: 'My Donations',
    state: 'donations',
    icon: FaBox,
  },
  {
    title: 'Events',
    state: 'events',
    component: Events,
    icon: FaCalendar,
  },
  {
    title: 'My Impact',
    state: 'impact',
    icon: FaAward,
  },
];

export const profile = {
  title: 'My Profile',
  state: 'profile',
  icon: FaUser,
};
