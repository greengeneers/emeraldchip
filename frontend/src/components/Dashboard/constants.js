import Donations from './Donations.jsx';
import Overview from './Overview.jsx';
import {
  FaAward,
  FaBox,
  FaCalendar,
  FaChartPie,
  FaUser,
} from 'react-icons/fa6';

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
    component: Donations,
    icon: FaBox,
  },
  {
    title: 'Events',
    state: 'events',
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
};

export const statusColor = {
  Recycled: '#3DA733',
  'In Process': '#BABA30',
  Pending: '#EE4B2B	',
};
