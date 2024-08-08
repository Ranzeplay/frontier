import {
  Input,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { getCurrentMonthInputText } from "../../utils/datetime";
import { AccountingEntry } from "../../models/accounting";
import { useEffect, useState } from "react";
import { AccountingService } from "../../services/accountingService";
import dayjs from "dayjs";
import { AccountingIncomeExpenseChart } from "./view/incomeExpense";
import AccountingWaterfallChart from "./view/waterfall";
import { AccountingRadarChart } from "./view/radar";

export default function AccountingOverviewPage() {
  const [month, setMonth] = useState(getCurrentMonthInputText());
  const [data, setData] = useState<AccountingEntry[]>([]);

  useEffect(() => {
    AccountingService.getAccountingEntriesByMonth(new Date(month)).then(
      (entries) => {
        setData(entries.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()));
      }
    );
  }, [month]);

  return (
    <div className="p-8 flex flex-col space-y-4">
      <h1 className="text-4xl font-bold">Accounting Overview</h1>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl">
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800">Statistics</h3>
          <div className="mt-5 flex flex-col">
            <TabGroup className="w-full flex flex-col space-y-8">
              <TabList className="flex flex-row space-x-2">
                <Input
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="rounded-md px-3 py-1 shadow-md border border-1 border-gray-700"
                />
                <Tab className="rounded-md px-3 py-1 shadow-md data-[hover]:bg-gray-100 data-[hover]:underline data-[selected]:bg-black data-[selected]:text-white transition">
                  Income & Expense
                </Tab>
                <Tab className="rounded-md px-3 py-1 shadow-md data-[hover]:bg-gray-100 data-[hover]:underline data-[selected]:bg-black data-[selected]:text-white transition">
                  Waterfall
                </Tab>
                <Tab className="rounded-md px-3 py-1 shadow-md data-[hover]:bg-gray-100 data-[hover]:underline data-[selected]:bg-black data-[selected]:text-white transition">
                  Radar
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <AccountingIncomeExpenseChart data={data} />
                </TabPanel>
                <TabPanel>
                  <AccountingWaterfallChart data={data} />
                </TabPanel>
                <TabPanel>
                  <AccountingRadarChart data={data} />
                </TabPanel>
              </TabPanels>
            </TabGroup>

            <div className="flex flex-row space-x-2">
              <h4 className="font-bold">Overall flow in this month:</h4>
              <p className="text-green-600">
                +{data.filter(i => i.type == "income").reduce((acc, entry) => acc + entry.amount, 0)}
              </p>
              <p className="text-red-600">
                -{data.filter(i => i.type == "expense").reduce((red, entry) => red + entry.amount, 0)}
              </p>
              <p className="text-black">
                =
              </p>
              <p className="text-blue-500">
                {data.filter(i => i.type == "income").reduce((acc, entry) => acc + entry.amount, 0) - data.filter(i => i.type == "expense").reduce((red, entry) => red + entry.amount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl">
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800">Operations</h3>
          <div className="mt-5 flex flex-row space-x-2">
            <Link
              role="button"
              to="/accounting/edit/new"
              className="px-4 py-1.5 hover:bg-blue-500 text-blue-500 hover:text-white rounded-md border-blue-500 border transition"
            >
              Add
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl">
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800">Details</h3>
          <div className="mt-5 flex flex-row space-x-2">
            <table className="flex-grow">
              <thead className="border-b-2 border-gray-300">
                <tr className="*:text-left">
                  <th scope="col" className="px-3 py-2">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-3 py-2" scope="row">
                      {dayjs(entry.time).format("MMMM D - H:mm")}
                    </td>
                    <td className="px-3 py-2">{entry.category}</td>
                    <td className="px-3 py-2">
                      <Link className="text-blue-500 hover:underline" to={`/accounting/edit/${entry.id}`}>{entry.title}</Link>
                    </td>
                    <td
                      className={`px-3 py-2 ${entry.type === "expense" ? "text-red-600" : "text-green-600"}`}
                    >
                      {entry.type === "expense" ? "-" : "+"}
                      {entry.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
