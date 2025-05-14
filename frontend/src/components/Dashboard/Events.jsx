import {
  useState,
  useEffect
} from "react";
import CalendarNav from './Events/CalendarNav.jsx';
import CalendarView from './Events/CalendarView.jsx';
import CalendarFooter from './Events/CalendarFooter.jsx';

import { listEvents, showEventById } from '../../adapters/event-adapter.js';


export default function Events() {

  // not sure if this is the optimal approach but just for a dirty prototype this should be okay :sob:
  // also this is just the data for today's demo!!!
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(5);
  const [currentWeek, setCurrentWeek] = useState(19);
  const [currentDay, setCurrentDay] = useState(7);

  const [events, setCurrentEvents] = useState(null);

  // 'All Events' or 'My Events'
  const [viewMode, setViewMode] = useState('All Events');

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
          // convert all the start and end date in to Date()
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);
          event.startDate = startDate;
          event.endDate = endDate;

          const date = `${event.startDate.getFullYear()}_${event.startDate.getMonth()+1}_${event.startDate.getDate()}`;
          console.log(date);
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

  const handlePrevMonth = () => {
    console.log(currentMonth);
    if (currentMonth === 1) {
      setCurrentYear(currentYear-1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth-1);
    }
  }

  const handleNextMonth = () => {
    console.log(currentMonth);
    if (currentMonth === 12) {
      setCurrentYear(currentYear+1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth+1);
    }
  }

  const handleViewModeChange = () => {
    if (viewMode === 'All Events') setViewMode('My Events');
    if (viewMode === 'My Events') setViewMode('All Events');
  }

  const handleJumpToday = () => {
    // logic for jumping to today's date.
  }

  return (<>
    <div className='calendar-container'>
      <CalendarNav props={{
          currentYear, currentMonth, currentWeek, currentDay, viewMode, handlePrevMonth, handleNextMonth, handleViewModeChange, handleJumpToday
        }}
      />
      <CalendarView props={{
          currentYear, currentMonth, currentWeek, currentDay, viewMode, events
        }}
      />
      <CalendarFooter />

    </div>
  </>)
}
