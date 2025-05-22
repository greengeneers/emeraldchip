import { useRef, useState, useEffect, useCallback } from "react";
import CalendarNav from "./Events/CalendarNav.jsx";
import CalendarView from "./Events/CalendarView.jsx";

import { setCalendarContentAnimation } from "../../utils/animationUtils.js";
import { listEvents, showEventById } from "../../adapters/event-adapter.js";
import { getWeekNumber } from "../../utils/calendarUtils.js";
import { listRsvp } from "../../adapters/rsvp-adapter.js";

export default function Events() {
  // not sure if this is the optimal approach but just for a dirty prototype this should be okay :sob:
  // also this is just the data for today's demo!!!
  const currentDate = new Date(2025, 5, 1);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth()); // months are 0-indexed
  const [currentWeek, setCurrentWeek] = useState(getWeekNumber(currentDate));
  const [events, setCurrentEvents] = useState(null);
  // 'ALL' or 'RSVP'
  const [whichEvents, setWhichEvents] = useState("ALL");
  // 'Monthly' or 'Weekly'
  const [viewMode, setViewMode] = useState("Monthly");
  // for scroll/swipe
  const calendarRef = useRef(null);
  const scrollTimeout = useRef(null);
  // states for modal
  const [modalEvent, setModalEvent] = useState(null);
  const [modalPosition, setModalPosition] = useState(null);

  useEffect(() => {
    setModalEvent(null);
    setModalPosition(null);
  }, [currentYear, currentMonth]);

  const openEventModal = (event, position) => {
    setModalPosition(position);
    setModalEvent(event);
  };

  // please i am so cooked do not say anything about this
  const closeEventModal = (e) => {
    let flags = 0;
    if (e) {
      const div = e.target.closest("div");
      if (div && !div.classList.contains("event-modal-frame")) flags++;
      const isCloseButton = e.target.closest("button");
      if (
        isCloseButton &&
        !isCloseButton.classList.contains("event-modal-exit")
      ) {
        flags++;
      }
      if (flags >= 2) return;
    }
    setModalEvent(null);
    setModalPosition(null);
  };

  const fetchEvents = useCallback(async () => {
    try {
      let data, error;
      if (whichEvents === "ALL")
        [data, error] = await listEvents(`${currentYear}${currentMonth}`);
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
        if (!acc[date]) acc[date] = [];
        acc[date].push(event);
        return acc;
      }, {});
      setCurrentEvents(processedEvents);
    } catch (error) {
      return (
        <>
          <h1>nvm it broke!</h1>
        </>
      );
    }
  }, [currentYear, currentMonth, whichEvents]);

  useEffect(() => {
    fetchEvents();
  }, [currentMonth, whichEvents]);

  const handleWhichEventsChange = () => {
    if (whichEvents === "ALL") setWhichEvents("RSVP");
    else setWhichEvents("ALL");
    closeEventModal();
  };

  const handleViewModeChange = () => {
    if (viewMode === "Monthly") setViewMode("Weekly");
    else setViewMode("Monthly");
    closeEventModal();
  };

  const handlePrevMonth = () => {
    let monthToSet = currentMonth - 1;
    if (monthToSet < 0) monthToSet = 11;
    let yearToSet = currentYear;
    if (monthToSet === 11) yearToSet -= 1;
    setCalendarContentAnimation(currentMonth, monthToSet);
    setCurrentMonth(monthToSet);
    setCurrentYear(yearToSet);
    closeEventModal();
  };

  const handleNextMonth = () => {
    let monthToSet = currentMonth + 1;
    if (monthToSet > 11) monthToSet = 0;
    let yearToSet = currentYear;
    if (monthToSet === 0) yearToSet += 1;
    setCalendarContentAnimation(currentMonth, monthToSet);
    setCurrentMonth(monthToSet);
    setCurrentYear(yearToSet);
    closeEventModal();
  };

  const handleJumpToday = () => {
    const today = new Date();
    const { weekNumber } = getWeekNumber(today);
    const fromDay = new Date(currentYear, currentMonth);

    let from, to;
    if (
      fromDay.getFullYear() === today.getFullYear() &&
      fromDay.getMonth() === today.getMonth()
    ) {
      [from, to] = [0, 0];
    } else {
      [from, to] = fromDay > today ? [1, 0] : [0, 1];
    }
    setCalendarContentAnimation(from, to);
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setCurrentWeek(weekNumber);
    closeEventModal();
  };

  return (
    <>
      <div ref={calendarRef} className="calendar-container">
        <CalendarNav
          props={{
            currentYear,
            currentMonth,
            currentWeek,
            whichEvents,
            viewMode,
            handlePrevMonth,
            handleNextMonth,
            handleWhichEventsChange,
            handleViewModeChange,
            handleJumpToday,
          }}
        />
        <CalendarView
          props={{
            currentYear,
            currentMonth,
            currentWeek,
            whichEvents,
            viewMode,
            events,
            modalEvent,
            closeEventModal,
            openEventModal,
            modalPosition,
          }}
        />
      </div>
    </>
  );
}
