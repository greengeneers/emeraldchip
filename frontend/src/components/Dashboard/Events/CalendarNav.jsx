import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

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
    currentDay
  } = props;
  const date = new Date(currentYear, currentMonth, 1);
  const formattedMonth = date.toLocaleString('default', { month: 'long' })

  return (<>
    <div className='calendar-nav'>
      <div className='calendar-left-controls'>
        <div className='calendar-month-nav-container'>
          <button
            className='calendar-month-prev'
            onClick={handlePrevMonth}
          >
            <SlArrowLeft />
          </button>
          <button
            className='calendar-month-next'
            onClick={handleNextMonth}
          >
            <SlArrowRight />
          </button>
        </div>
        <div className='calendar-header-container'>
          <span id='header-month'>{formattedMonth}</span>
          <span id='header-year'>{currentYear}</span>
        </div>
        {/* <div className='calendar-nav-separator'>•</div> */}
        <button
          className='which-events-change'
          onClick={handleWhichEventsChange}
        >
          {whichEvents}
        </button>
      </div>
      <div className='middle-padding'></div>
      <div className='calendar-right-controls'>
        {/* <button
          className='view-mode-change'
          onClick={handleViewModeChange}
        >
          {viewMode}
        </button> */}
        <button
          className='jump-today'
          onClick={handleJumpToday}
        >
          Today
        </button>
      </div>
    </div>
  </>)
}
