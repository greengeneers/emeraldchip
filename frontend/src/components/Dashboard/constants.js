import Donations from './Donations.jsx';
import Overview from './Overview.jsx';

import Events from './Events.jsx';
import Facilities from './Facilities.jsx';
import {
  FaAward,
  FaBox,
  FaBuilding,
  FaCalendar,
  FaChartPie,
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
    title: 'Facilities',
    state: 'facilities',
    component: Facilities,
    icon: FaBuilding
  },

  {
    title: 'Events',
    state: 'events',
    component: Events,
    icon: FaCalendar,
  },

];

export const profile = {
  title: 'My Profile',
  state: 'profile',
  icon: FaUser,
};

export const weekdays = [
  {
    full: 'Sunday',
    short: 'SUN',
  },
  {
    full: 'Monday',
    short: 'MON',
  },
  {
    full: 'Tuesday',
    short: 'TUE',
  },
  {
    full: 'Wednesday',
    short: 'WED',
  },
  {
    full: 'Thursday',
    short: 'THU',
  },
  {
    full: 'Friday',
    short: 'FRI',
  },
  {
    full: 'Saturday',
    short: 'SAT',
  },
]

export const statusColor = {
  'Donated': '#3DA733',
  'In Transit': '#BABA30',
  'Pending': '#EE4B2B	',
};
