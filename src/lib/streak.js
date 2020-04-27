
/*
    this datastructure needs to hold the individual Date Objects, the length of the streak in Days, Months and Years
*/
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export default class Streak {
  // input should be YYYY MM DD
  constructor(year, month, day) {
    this.today = new Date();
    this.beginning = new Date(year, month, day);
    this.streakLength = this.daysBetween(this.beginning, this.today);
    this.list = this.getStreakList(this.streakLength);
  }

  daysBetween = (startDate, endDate) => {
    const oneDay = 1000 * 60 * 60 * 24;

    const differenceMilli = Math.abs(endDate - startDate);
    return Math.round(differenceMilli / oneDay);
  };
  getStreakList = (streakLength) => {
    const strArr = [];
    for (let i = 0; i < streakLength; i++) {
      let streakDate = this.beginning.addDays(i);
      strArr.push([streakDate.toDateString().split(" "), streakDate, i]);
    }
    return strArr;
  };

  getMonthsAndYears = () => {
    const mySet = new Set();

    for (let i = 0; i < this.list.length; i++) {
      const date = this.list[i];
      const monthName = getMonthName(date[1]);
      const totalDaysInMonth = daysInMonth(date);
      const year = date[1].getFullYear();
      const key = `${monthName} ${year}`;

      mySet.add(`${key} ${totalDaysInMonth}`);
    }
    return mySet;
  };
  groupByMonth = () => {
    const monthsArr = [];
    const months = this.getMonthsAndYears();
    const dates = this.list;

    for (let month of months) {
      const monthArr = month.split(" ");

      const filterDates = dates.filter(
        (date) =>
          getMonthName(date[1]) === monthArr[0] && date[0][3] === monthArr[1]
      );

      monthsArr.push([
        `${monthArr[0]} ${monthArr[1]}`,
        Number(monthArr[2]),
        filterDates,
      ]);
    }

    return monthsArr;
  };
  getChip = (date) => {
    const dayNumber = date[2];
    const startDate = this.beginning.getDate();
    const thisDate = date[1].getDate();
    const thisMonth = date[1].getMonth();
    const months = this.groupByMonth();
    const sixMonths = this.beginning.getMonth() + 6;
    const nineMonths = this.beginning.getMonth() + 9;
    //   const eighteenMonths = months[17][2][startDate -1]

    if (dayNumber === 30 || dayNumber === 60 || dayNumber === 90) {
      return `Congratulations for ${dayNumber} days!`;
    } else if (thisMonth === sixMonths && thisDate === startDate) {
      return `Congratulations for six months!`;
    } else if (thisMonth === nineMonths && thisDate === startDate) {
      return `Congratulations for nine months!`;
    } 
     return "";
    }
  
}
const getMonthName = (date) => {
  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  const getMonth = date.getMonth();
  return month[getMonth];
};
function daysInMonth(date) {
  const month = date[1].getMonth() + 1;
  const year = date[0][3];
  return new Date(year, month, 0).getDate();
}
