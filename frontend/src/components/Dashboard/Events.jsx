import {
  useState,
  useEffect
} from "react";
import CalendarNav from './Events/CalendarNav.jsx';
import CalendarView from './Events/CalendarView.jsx';

import { listEvents, showEventById } from '../../adapters/event-adapter.js';
import { getWeekNumber } from "../../utils/calendarUtils.js";
import { listRsvp } from "../../adapters/rsvp-adapter.js";


export default function Events() {
  // not sure if this is the optimal approach but just for a dirty prototype this should be okay :sob:
  // also this is just the data for today's demo!!!
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth()); // months are 0-indexed
  const [currentWeek, setCurrentWeek] = useState(getWeekNumber(currentDate));
  const [events, setCurrentEvents] = useState(null);
  // 'ALL' or 'RSVP'
  const [whichEvents, setWhichEvents] = useState('ALL');
  // 'Monthly' or 'Weekly'
  const [viewMode, setViewMode] = useState('Monthly');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let data, error;
        if (whichEvents === 'ALL') [data,error] = await listEvents(`${currentYear}${currentMonth}`);
        else [data, error] = await listRsvp();

        if (error) throw new Error(error);
        // get the day for each and add that to data
        const processedEvents = data.reduce((acc, event) => {
          // convert all the start and end date in to Date()
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);
          event.startDate = startDate;
          event.endDate = endDate;

          const date = `${event.startDate.getFullYear()}_${event.startDate.getMonth()}_${event.startDate.getDate()}`;
          console.log(date);
          if (!acc[date]) acc[date] = [];
          acc[date].push(event);
          return acc;
        }, {});
        console.log('processed:', processedEvents);
        setCurrentEvents(processedEvents);
      } catch (error) {
        return <><h1>nvm it broke!</h1></>
      }
    };
    fetchEvents();
  }, [currentMonth, whichEvents]);

  const handlePrevMonth = () => {
    let monthToSet = currentMonth-1;
    if (monthToSet < 0) monthToSet = 11;
    let yearToSet = currentYear;
    if (monthToSet === 11) yearToSet -= 1;
    setCurrentMonth(monthToSet);
    setCurrentYear(yearToSet);
  }

  const handleNextMonth = () => {
    let monthToSet = currentMonth+1;
    if (monthToSet > 11) monthToSet = 0;
    let yearToSet = currentYear;
    if (monthToSet === 0) yearToSet += 1;
    setCurrentMonth(monthToSet);
    setCurrentYear(yearToSet);
  }

  const handleWhichEventsChange = () => {
    if (whichEvents === 'ALL') setWhichEvents('RSVP');
    else setWhichEvents('ALL');
  }

  const handleViewModeChange = () => {
    if (viewMode === 'Monthly') setViewMode('Weekly');
    else setViewMode('Monthly');
  }


  const handleJumpToday = () => {
    const today = new Date();
    const { weekNumber } = getWeekNumber(today);
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setCurrentWeek(weekNumber);
  }


  return (<>
    <div className='calendar-container'>
      <CalendarNav props={{
          currentYear, currentMonth, currentWeek, whichEvents, viewMode, handlePrevMonth, handleNextMonth, handleWhichEventsChange, handleViewModeChange, handleJumpToday
        }}
      />
      <CalendarView props={{
          currentYear, currentMonth, currentWeek, whichEvents, viewMode, events
        }}
      />
    </div>
  </>)
}
