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
import { getCurrentDayInputText } from "../../utils/datetime";
import { CalendarMonthlyView } from "./monthlyView";
import { CalendarWeeklyView } from "./weeklyView";
import { CalendarDailyView } from "./dailyView";

export default function CalendarOverviewPage() {
  const now = dayjs();
  const startOfMonthWeekStart = now.startOf("month").startOf("week");
  const days: Dayjs[] = [];
  for (let i = 0; i < 42; i++) {
    days.push(startOfMonthWeekStart.add(i, "day"));
  }

  return (
    <div className="h-full w-full flex flex-col divide-y-2">
      <TabGroup className="w-full flex flex-col space-y-1">
        <TabList className="flex flex-row space-x-2 p-2 items-baseline">
          <Input
            defaultValue={getCurrentDayInputText()}
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
            <CalendarMonthlyView baseDate={now} />
          </TabPanel>
          <TabPanel className="flex flex-col">
            <CalendarWeeklyView baseDate={now} />
          </TabPanel>
          <TabPanel className="p-4">
            <CalendarDailyView baseDate={now} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
