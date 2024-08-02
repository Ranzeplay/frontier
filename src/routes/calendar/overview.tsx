import dayjs, { Dayjs } from "dayjs";
import { CalendarEvent } from "../../models/calendar";

export default function CalendarOverviewPage() {
  const now = dayjs();
  const firstDayOfMonthDay = now.startOf("month").day();

  return (
    <div className="h-full w-full">
      <div className="flex flex-row border border-gray-300 divide-x-2 border-b-2">
        <CalendarHeaderEntry text="Sun" />
        <CalendarHeaderEntry text="Mon" />
        <CalendarHeaderEntry text="Tue" />
        <CalendarHeaderEntry text="Wed" />
        <CalendarHeaderEntry text="Thu" />
        <CalendarHeaderEntry text="Fri" />
        <CalendarHeaderEntry text="Sat" />
      </div>
      <div className="grid grid-cols-7 grid-rows-6 h-3/5 divide-x-2 divide-y container">
        <CalendarMonthlyViewEntry targetDate={now} />
      </div>
      <div className="flex flex-row border border-gray-300">
        <div className="w-3/5 border border-gray-300">
          <h2>Events on 2024.5.3</h2>
        </div>
        <div className="w-2/5 border border-gray-300">
          <h2>Upcoming events</h2>
        </div>
      </div>
    </div>
  );
}

export function CalendarMonthlyViewEntry(props: { targetDate: Dayjs }) {
  return (
    <div className="w-full h-full flex flex-col bg-white p-1">
      <h5 className="h-6 w-6 rounded-full bg-gray-200 shadow text-center">
        {props.targetDate.date()}
      </h5>
    </div>
  );
}

export function CalendarMonthlyViewEventEntry(props: { event: CalendarEvent }) {
  return (
    <div className="w-full h-12 flex bg-white items-center text-sm">
      <h5 className="py-1 px-3 w-min mx-auto">{props.event.title}</h5>
    </div>
  );
}

export function CalendarHeaderEntry(props: { text: string }) {
  return (
    <div className="w-full h-min flex bg-white items-center text-sm uppercase text-gray-400 font-bold">
      <h5 className="py-1 px-3 w-min mx-auto">{props.text}</h5>
    </div>
  );
}
