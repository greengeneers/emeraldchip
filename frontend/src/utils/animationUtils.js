export const setCalendarContentAnimation = (currentMonth, monthToSet) => {
  if (currentMonth === monthToSet) return;
  // grab and reset
  const calendarContainer = document.querySelector(".calendar-body");
  calendarContainer.classList.remove(
    "slide-from-left-animation",
    "slide-from-right-animation",
  );
  void calendarContainer.offsetWidth;
  if (currentMonth > monthToSet || (currentMonth === 0 && monthToSet === 11)) {
    calendarContainer.classList.add("slide-from-left-animation");
  } else {
    calendarContainer.classList.add("slide-from-right-animation");
  }
};
