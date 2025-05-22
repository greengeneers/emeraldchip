export default function CalendarCell({
  currentMonth,
  date,
  dailyEvents,
  openEventModal,
}) {
  const dateObj = new Date(date.year, date.month, date.day);
  const today = new Date();
  const isToday =
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear();

  const formattedMonth = dateObj.toLocaleString("default", { month: "long" });

  const handleOpenEventModal = (e) => {
    const button = e.target.closest("button");
    const rect = button.getBoundingClientRect();
    const buttonWidth = rect.width;
    let x = rect.right + 5;
    let y = rect.top;
    const li = e.target.closest("li");
    openEventModal(dailyEvents[li.dataset.eventIndex], { x, y, buttonWidth });
  };

  return (
    <>
      <div className={`calendar-cell`}>
        <div
          className={`calendar-cell-header ${currentMonth === dateObj.getMonth() ? "" : "not-current-month"}`}
        >
          <div
            className={`calendar-cell-header-text-container ${isToday ? "today" : ""}`}
          >
            <span className="calendar-cell-header-text">
              {date.day === 1 ? `${formattedMonth} ${date.day}` : date.day}
            </span>
          </div>
        </div>
        <div className={`calendar-cell-body`}>
          {dailyEvents && (
            <ol className="calendar-cell-events">
              {dailyEvents.map((event, eventIndex) => {
                return (
                  <li
                    key={event.name}
                    className="calendar-cell-events-li"
                    data-event-index={eventIndex}
                  >
                    <button
                      className="calendar-cell-events-button"
                      onClick={handleOpenEventModal}
                    >
                      <div className="calendar-cell-events-title">
                        <p className='event-name-title'>{event.name}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </>
  );
}
