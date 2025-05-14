
export default function CalendarNav({ props }) {
  const {
    currentYear,
    currentMonth,
    viewMode,
    handlePrevMonth,
    handleNextMonth,
    handleViewModeChange,
    handleJumpToday,
    // pending use
    currentWeek,
    currentDay
  } = props;
  // TODO: please be mindful of currentMonth-1 here
  const date = new Date(currentYear, currentMonth-1, 1);
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
        {/* <span id='header-week'>Week {currentWeek}</span> */}
      </div>
      <div className='middle-padding'></div>
      <div className='calendar-view-controls'>
        <button
          className='view-change'
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
