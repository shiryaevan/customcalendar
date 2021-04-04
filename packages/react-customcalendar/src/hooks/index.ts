import { useState, useCallback, useRef } from "react";

import { Calendar } from "../../../customcalendar/dist/";

export const useCalendar = () => {
  const calendarInstance = useRef<Calendar | null>(null);

  if (calendarInstance.current === null) {
    calendarInstance.current = new Calendar();
  }

  const getCaledarData = () => calendarInstance.current?.calendarInfoObject;

  const [calendarData, setCalendarData] = useState(() => getCaledarData());

  const onPrevClickHandler = useCallback(() => {
    calendarInstance.current?.setPrevMonth();
    setCalendarData(getCaledarData());
  }, []);

  const onNextClickHandler = useCallback(() => {
    calendarInstance.current?.setNextMonth();
    setCalendarData(getCaledarData());
  }, []);

  return {
    ...calendarData,
    toNextMonth: onNextClickHandler,
    toPrevMonth: onPrevClickHandler
  };
};
