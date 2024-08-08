export type CalendarEvent = {
  id: string;
  type: "span" | "deadline" | "reminder";
};

export type CalendarSpanEvent = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  content: string;
};

export type CalendarDeadlineEvent = {
  id: string;
  title: string;
  time: Date;
  content: string;
};

export type CalendarReminderEvent = {
  id: string;
  title: string;
  time: Date;
  content: string;
};
