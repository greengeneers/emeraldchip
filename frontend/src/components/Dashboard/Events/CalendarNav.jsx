
export default function CalendarNav({ props }) {
  const {
    currentYear,
    currentMonth,
    whichEvents,
    viewMode,
    handlePrevMonth,
    handleNextMonth,
    handleWhichEventsChange,
    handleViewModeChange,
    handleJumpToday,
    // pending use
    currentWeek,
    currentDay
  } = props;
  const date = new Date(currentYear, currentMonth, 1);
  const formattedMonth = date.toLocaleString('default', { month: 'long' })

  return (<>
    <div className='calendar-nav'>
      <div className='calendar-month-nav-container'>
        <button
          className='calendar-month-prev'
          onClick={handlePrevMonth}
        >
          prev
        </button>
        <button
          className='calendar-month-next'
          onClick={handleNextMonth}
        >
          next
        </button>
      </div>
      <div className='calendar-header-container'>
        <span id='header-month'>{formattedMonth}</span>
        <span id='header-year'>{currentYear}</span>
      </div>
      <div className='middle-padding'></div>
      <div className='calendar-view-controls'>
        <button
          className='which-events-change'
          onClick={handleWhichEventsChange}
        >
          {whichEvents}
        </button>
        <button
          className='view-mode-change'
          onClick={handleViewModeChange}
        >
          {viewMode}
        </button>
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
