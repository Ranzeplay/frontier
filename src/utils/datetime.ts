import dayjs from "dayjs";

export const getCurrentMonthInputText = () => {
  return dayjs().format("YYYY-MM");
};

export const getCurrentDayInputText = () => {
  return dayjs().format("YYYY-MM-DD");
};

export const getNthFromDate = (day: number) => {
  if (day == 1 || (day > 20 && day % 10 == 1)) return "st";
  else if (day == 2 || (day > 20 && day % 10 == 2)) return "nd";
  else if (day == 3 || (day > 20 && day % 10 == 3)) return "rd";
  else return "th";
}
