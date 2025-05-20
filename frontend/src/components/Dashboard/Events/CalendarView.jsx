import EventModal from "./EventModal.jsx";
import CalendarCell from "./CalendarCell.jsx";
import { weekdays } from "../constants.js";
import {
  buildMonthMatrix,
  getWeekNumber,
} from "../../../utils/calendarUtils.js";

import { useState, useRef, useEffect } from "react";

export default function CalendarView({ props }) {
  const { currentYear, currentMonth, currentWeek, viewMode, events } = props;
  const [modalEvent, setModalEvent] = useState(null);
  const [modalPosition, setModalPosition] = useState(null);

  const openEventModal = (event, position) => {
    setModalEvent(event);
    setModalPosition(position);
  };

  // could be a handler on a click anywhere outside the rendered modal
  const closeEventModal = (e) => {
    e.preventDefault();
  };

  const monthMatrix = buildMonthMatrix(currentYear, currentMonth);
  const weekNumbers = monthMatrix.map((week) =>
    getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)),
  );

  return (
    <>
      {modalPosition && (
        <EventModal eventData={modalEvent} closeEventModal={closeEventModal} />
      )}
      <div className="calendar-body">
        <div className="calendar-side-label">
          {viewMode === "Monthly" ? (
            <>
              <div className="side-label-heading">W</div>
              <ol className="side-label-content">
                {weekNumbers.map((number) => {
                  return (
                    <li
                      key={`${number.year}_${number.week}`}
                      className="side-label-item"
                    >
                      {number.week}
                    </li>
                  );
                })}
              </ol>
            </>
          ) : (
            // ignore this for now
            <>
              <div className="side-label-heading">H</div>
              <div className="side-label-content"></div>
            </>
          )}
        </div>
        <div className="calendar-content">
          <div className="weekdays-row">
            {weekdays.map((day) => {
              return (
                <div key={day.short} className="weekday-heading">
                  <p>{day.short}</p>
                </div>
              );
            })}
          </div>
          <div className="main-grid">
            {monthMatrix.map((weeks, rowIndex) => {
              return (
                <div key={rowIndex} className="grid-row">
                  {weeks.map((date) => {
                    const dateString = `${date.year}_${date.month}_${date.day}`;
                    let dailyEvents = null;
                    if (events) dailyEvents = events[dateString];
                    return (
                      <CalendarCell
                        key={dateString}
                        currentMonth={currentMonth}
                        date={date}
                        dailyEvents={dailyEvents}
                        openEventModal={openEventModal}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
