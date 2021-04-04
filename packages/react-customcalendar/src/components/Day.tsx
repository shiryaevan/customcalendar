import React from 'react';
import { cn } from "../utils";

export const Day = ({ date, isWeekend, isToday, isNeighboringMonth }) => {
  return (
    <div
      className={cn([
        "calendar__day",
        isWeekend && "calendar__day_weekend",
        isToday && "calendar__day_today",
        isNeighboringMonth && "calendar__day_neighboringMonth"
      ])}
    >
      {date}
    </div>
  );
};
