
export default function CalendarNav({ props }) {
  const { currentYear, currentMonth, currentWeek, currentDay, viewMode } = props;
  // 1 is a placeholder, just to make a yearMonth date representation
  const date = new Date(currentYear, currentMonth, 1);
  const formattedMonth = date.toLocaleString('default', { month: 'long' })

  return (<>
    <div className='calendar-nav'>
      <button className='jump-today'>Today</button>
      <div className='nav-buttons'>
        <button className='nav-previous'>{'<'}</button>
        <button className='nav-next'>{'>'}</button>
      </div>
      <button className='nav-jump'>{formattedMonth} {currentYear}</button>
      <div className='middle-padding' />
      <button className='view-toggle'>{viewMode}</button>
    </div>
  </>)
}
