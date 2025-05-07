import '../styles/Calendar.css';

import {
  useState,
  useEffect
} from "react";
import CalendarNav from './CalendarNav';
import CalendarView from './CalendarView';
import CalendarFooter from './CalendarFooter';

import { listEvents, showEventById } from '../adapters/event-adapter.js';


export default function Calendar() {

  // not sure if this is the optimal approach but just for a dirty prototype this should be okay :sob:
  // also this is just the data for today's demo!!!
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(5);
  const [currentWeek, setCurrentWeek] = useState(19);
  const [currentDay, setCurrentDay] = useState(7);
  const [events, setCurrentEvents] = useState(null);

  const [viewMode, setViewMode] = useState('Month'); // day, week, month!

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        const [data, error] = await listEvents(`${year}${month}`);
        if (error) throw new Error(error);
        // get the day for each and add that to data
        const processedEvents = data.reduce((acc, event) => {
          const date = new Date(event.startDate).getDate();
          if (!acc[date]) acc[date] = [];
          acc[date].push(event);
          return acc;
        }, {});
        setCurrentEvents(processedEvents);
      } catch (error) {
        return <><h1>nvm it broke!</h1></>
      }
    };
    fetchEvents();
  }, []);

  // the calendar will fetch new things based on viewmode updates, and if
  useEffect(() => {
    // TODO: fetch new events that considers:
    // the currentViewMode, and the corresponding YMD if applicable
    switch (viewMode) {
      case 'M':
        break;
      case 'W':
        break;
      case 'D':
        break;
    }
  }, [viewMode]);

  // there will be different useEffs because different viewMOdes have different triggers
  useEffect(() => {

  }, [currentYear]);
  useEffect(() => {

  }, [currentMonth]);
  useEffect(() => {

  }, [currentWeek]);
  useEffect(() => {

  }, [currentDay]);



  return (<>
    <div className='calendar-container'>
      <CalendarNav props={{
          currentYear, currentMonth, currentWeek, currentDay, viewMode
        }}
      />
      <CalendarView props={{
          events
        }}
      />
      <CalendarFooter />

    </div>
  </>)
}
