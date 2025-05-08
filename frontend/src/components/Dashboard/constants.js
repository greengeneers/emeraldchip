import Overview from './Overview.jsx';
import { FaAward, FaBox, FaCalendar, FaChartPie } from 'react-icons/fa6';

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
    icon: FaCalendar,
  },
  {
    title: 'My Impact',
    state: 'impact',
    icon: FaAward,
  },
];
