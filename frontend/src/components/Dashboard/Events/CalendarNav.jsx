import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useRef } from "react";

export default function CalendarNav({ props }) {
  const {
    currentYear,
    currentMonth,
    whichEvents,
    handlePrevMonth,
    handleNextMonth,
    handleWhichEventsChange,
    handleJumpToday,
    // pending use
    viewMode,
    handleViewModeChange,
    currentWeek,
    currentDay,
  } = props;
  const whichEventsButtonRef = useRef(null);

  const date = new Date(currentYear, currentMonth, 1);
  const formattedMonth = date.toLocaleString("default", { month: "long" });

  const whichEventsTrigger = (e) => {
    // trigger animation
    const button = whichEventsButtonRef.current;
    if (button) {
      button.classList.remove("slide-animation");
      void button.offsetWidth; // Force reflow
      button.classList.add("slide-animation");
    }
    // call the actual handler
    handleWhichEventsChange(e);
  };

  return (
    <>
      <div className="calendar-nav">
        <div className="calendar-left-controls">
          <div className="calendar-month-nav-container">
            <button className="calendar-month-prev" onClick={handlePrevMonth}>
              <SlArrowLeft />
            </button>
            <button className="calendar-month-next" onClick={handleNextMonth}>
              <SlArrowRight />
            </button>
          </div>
          <div className="calendar-header-container">
            <span id="header-month">{formattedMonth}</span>
            <span id="header-year">{currentYear}</span>
          </div>
          <button
            ref={whichEventsButtonRef}
            className="which-events-change"
            onClick={whichEventsTrigger}
          >
            {whichEvents}
          </button>
        </div>
        <div className="middle-padding"></div>
        <div className="calendar-right-controls">
          {/* <button
          className='view-mode-change'
          onClick={handleViewModeChange}
        >
          {viewMode}
        </button> */}
          <button className="jump-today" onClick={handleJumpToday}>
            Today
          </button>
        </div>
      </div>
    </>
  );
}
