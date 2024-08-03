import dayjs, { Dayjs } from "dayjs";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { getNthFromDate } from "../../utils/datetime";

export function CalendarDailyView(props: { baseDate: Dayjs }) {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <h2 className="flex font-serif text-lg font-semibold align-baseline">
            <span className="text-4xl font-bold">{props.baseDate.format("D")}</span>
            {getNthFromDate(props.baseDate.date())}
          </h2>
          <h5 className="font-semibold text-lg text-gray-500">
            {props.baseDate.format("MMMM, YYYY")}
          </h5>
        </div>
        <div className="flex flex-col space-y-2">
          <h3 className="text-2xl font-semibold">Events</h3>
          <div className="flex flex-col space-y-1">
            <div className="bg-white shadow rounded-md">
              <div className="p-4 flex flex-row justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">
                    <Link
                      className="text-blue-500 hover:underline cursor-pointer"
                      to={`/calendar/event/id`}
                    >
                      Event 1
                    </Link>
                  </h3>
                  <div className="flex flex-col space-y-2">
                    <p>Hello, world!</p>
                    <div className="flex flex-row space-x-4">
                      <p className="text-gray-500 flex flex-row space-x-1 items-center">
                        <Clock size={16} />
                        <span className="ml-1">{dayjs().format("HH:mm")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
