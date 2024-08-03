import { Dayjs } from "dayjs";
import { CalendarHeaderEntry, CalendarPanelEntry } from "./shared";

export function CalendarWeeklyView(props: { baseDate: Dayjs }) {
  const days: Dayjs[] = [];
  const weekStart = props.baseDate.startOf("week");

  for (let i = 0; i < 7; i++) {
    days.push(weekStart.add(i, "day"));
  }

  return (
    <>
      <div className="grid grid-cols-7 border-gray-300 divide-x-2 flex-grow-0">
        <CalendarHeaderEntry text="Sun" />
        <CalendarHeaderEntry text="Mon" />
        <CalendarHeaderEntry text="Tue" />
        <CalendarHeaderEntry text="Wed" />
        <CalendarHeaderEntry text="Thu" />
        <CalendarHeaderEntry text="Fri" />
        <CalendarHeaderEntry text="Sat" />
      </div>
      <div className="grid grid-cols-7 divide-x-2 divide-y flex-grow">
        {days.map((d) => (
          <CalendarPanelEntry targetDate={d} />
        ))}
      </div>
      <div className="flex flex-row border border-gray-300 flex-grow-0">
        <div className="w-3/5 border border-gray-300 p-1">
          <h2>Events on 2024.5.3</h2>
        </div>
        <div className="w-2/5 border border-gray-300 p-1">
          <h2>Upcoming events</h2>
        </div>
      </div>
    </>
  );
}
