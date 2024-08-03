import dayjs from "dayjs";
import { CalendarEvent } from "../../models/calendar";

export function CalendarHeaderEntry(props: { text: string }) {
  return (
    <div className="w-full h-min flex bg-white items-center text-sm uppercase text-gray-400 font-bold">
      <h5 className="py-1 px-3 w-min mx-auto">{props.text}</h5>
    </div>
  );
}

export function CalendarPanelEntry(props: { targetDate: dayjs.Dayjs }) {
    return (
      <div
        className={`w-full h-full flex flex-col ${props.targetDate.format("YYYY-MM") === dayjs().format("YYYY-MM") ? "bg-white" : "bg-gray-50"} p-1 space-y-2`}
      >
        <h5
          className={`h-6 w-6 rounded-full ${props.targetDate.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD") ? "bg-red-500 text-white" : "bg-gray-200"} shadow text-center ml-1 mt-1`}
        >
          {props.targetDate.date()}
        </h5>
        <div className="flex flex-col space-y-1">
          <CalendarPanelViewEventEntry
            event={{
              id: "1",
              title: "Demo event",
              date: new Date(),
              content: "Hello, world!",
            }}
          />
          <CalendarPanelViewEventEntry
            event={{
              id: "2",
              title: "Demo event",
              date: new Date(),
              content: "Hello, world!",
            }}
          />
        </div>
      </div>
    );
  }

  export function CalendarPanelViewEventEntry(props: { event: CalendarEvent }) {
    return (
      <div className="w-full py-0.5 px-1 rounded flex bg-yellow-100 hover:bg-yellow-200 transition cursor-pointer items-center text-xs">
        <h5 className="font-bold">{props.event.title}</h5>
      </div>
    );
  }
