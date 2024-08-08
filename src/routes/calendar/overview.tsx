import dayjs, { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import {
  TabGroup,
  TabList,
  Input,
  Tab,
  TabPanels,
  TabPanel,
  Button,
} from "@headlessui/react";
import { CalendarMonthlyView } from "./views/monthlyView";
import { CalendarWeeklyView } from "./views/weeklyView";
import { CalendarDailyView } from "./views/dailyView";
import { useState } from "react";

export default function CalendarOverviewPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const startOfMonthWeekStart = selectedDate.startOf("month").startOf("week");
  const days: Dayjs[] = [];
  for (let i = 0; i < 42; i++) {
    days.push(startOfMonthWeekStart.add(i, "day"));
  }

  return (
    <div className="h-full w-full flex flex-col divide-y-2">
      <TabGroup className="w-full flex flex-col space-y-1">
        <TabList className="flex flex-row space-x-2 p-2 items-baseline">
          <Input
            value={selectedDate.format("YYYY-MM-DD")}
            onChange={e => setSelectedDate(dayjs(e.target.value))}
            type="date"
            className="rounded-md px-3 py-1 shadow-md border border-1 border-gray-700"
          />
          <Tab className="rounded-md px-3 py-1 shadow-md bg-white data-[hover]:bg-gray-100 data-[hover]:underline data-[selected]:bg-black data-[selected]:text-white transition">
            Monthly
          </Tab>
          <Tab className="rounded-md px-3 py-1 shadow-md bg-white data-[hover]:bg-gray-100 data-[hover]:underline data-[selected]:bg-black data-[selected]:text-white transition">
            Weekly
          </Tab>
          <Tab className="rounded-md px-3 py-1 shadow-md bg-white data-[hover]:bg-gray-100 data-[hover]:underline data-[selected]:bg-black data-[selected]:text-white transition">
            Daily
          </Tab>
          <Button className="text-blue-500 hover:underline">View today</Button>
          <Link
            to="/calendar/event/add"
            role="button"
            className="text-blue-500 hover:underline"
          >
            Add event
          </Link>
        </TabList>
        <TabPanels>
          <TabPanel className="flex flex-col h-full">
            <CalendarMonthlyView baseDate={selectedDate} />
          </TabPanel>
          <TabPanel className="flex flex-col">
            <CalendarWeeklyView baseDate={selectedDate} />
          </TabPanel>
          <TabPanel className="p-4">
            <CalendarDailyView baseDate={selectedDate} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
