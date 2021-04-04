import { dateCellModel } from "./models";

export class Calendar {
  date: Date;

  constructor(date = new Date()) {
    this.date = date;
  }

  private times(count: number, callback: (i: any, index: number) => void) {
    [...Array(count)].map((i, index) => callback(i, index));
  }

  getDaysCountInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  getCurrentMonthInfo = () => {
    const currentMonth = this.date?.getMonth();
    const currentMonthName = this.date?.toLocaleDateString("default", {
      month: "long"
    });
    const currentYear = this.date?.getFullYear();
    const firstDayInMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayInMonth = new Date(currentYear, currentMonth + 1, 0).getDay();
    const offsetAtStartOfWeek = firstDayInMonth - 1;
    const offsetAtEndOfWeek = lastDayInMonth === 0 ? 0 : 7 - lastDayInMonth;
    const daysCountInMonth = this.getDaysCountInMonth(
      currentYear,
      currentMonth
    );
    const daysCountInMonthView =
      offsetAtStartOfWeek + daysCountInMonth + offsetAtEndOfWeek;

    return {
      now: this.date,
      currentMonth,
      currentYear,
      daysCountInMonth,
      offsetAtStartOfWeek,
      offsetAtEndOfWeek,
      daysCountInMonthView,
      currentMonthName
    };
  };

  getDates() {
    const dates: dateCellModel[] = [];
    const daysCountInMonthView = this.currentMonthInfo.daysCountInMonthView;
    const year = this.currentMonthInfo.currentYear;
    const month = this.currentMonthInfo.currentMonth;
    const offsetAtStartOfWeek = this.currentMonthInfo.offsetAtStartOfWeek;

    this.times(daysCountInMonthView, (i, index) => {
      const date = new Date(year, month, index + 1 - offsetAtStartOfWeek);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      dates.push({
        key: date.toString(),
        dateObject: date,
        date: date.getDate(),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        isToday: date.getTime() === today.getTime(),
        isNeighboringMonth: date.getMonth() !== month
      });
    });

    return dates;
  }

  getWeekDays() {
    const weekDays: string[] = [];
    this.times(7, (i, index) => {
      weekDays.push(
        new Date(2021, 0, 4 + index).toLocaleDateString("default", {
          weekday: "short"
        })
      );
    });
    return weekDays;
  }

  get weekDays() {
    return this.getWeekDays();
  }

  get currentMonthInfo() {
    return this.getCurrentMonthInfo();
  }

  get dates() {
    return this.getDates();
  }

  get calendarInfoObject() {
    return {
      weekDays: this.getWeekDays(),
      dates: this.getDates(),
      currentMonthInfo: this.getCurrentMonthInfo()
    };
  }

  setPrevMonth() {
    this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
  }

  setNextMonth() {
    this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
  }
}
