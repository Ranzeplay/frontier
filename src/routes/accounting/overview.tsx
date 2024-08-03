import {
  Input,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  Bar,
  BarChart,
  ResponsiveContainer,
} from "recharts";
import { getCurrentMonthInputText } from "../../utils/datetime";
import { AccountingEntry } from "../../models/accounting";
import { useEffect, useState } from "react";
import { AccountingService } from "../../services/accountingService";
import dayjs from "dayjs";

export default function AccountingOverviewPage() {
  const [month, setMonth] = useState(getCurrentMonthInputText());
  const [data, setData] = useState<AccountingEntry[]>([]);

  useEffect(() => {
    AccountingService.getAccountingEntriesByMonth(new Date(month)).then(
      (entries) => {
        setData(entries);
      }
    );
  }, [month]);

  return (
    <div className="p-8 flex flex-col space-y-4">
      <h1 className="text-4xl font-bold">Accounting Overview</h1>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl">
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800">Charts</h3>
          <div className="mt-5 flex flex-row">
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
                  <IncomeExpenseChart data={data} />
                </TabPanel>
                <TabPanel>
                  <WaterfallChart data={data} />
                </TabPanel>
                <TabPanel>
                  <RadarChart data={data} />
                </TabPanel>
              </TabPanels>
            </TabGroup>
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

function WaterfallChart(props: { data: AccountingEntry[] }) {
  return <>Not implemented yet.</>;
}

function RadarChart(props: { data: AccountingEntry[] }) {
  return <div></div>;
}

function IncomeExpenseChart(props: { data: AccountingEntry[] }) {
  const viewData: { day: string; income: number; expense: number }[] = [];
  for (let i = 1; i <= 31; i++) {
    viewData.push({
      day: i.toString(),
      income: props.data
        .filter(
          (entry) =>
            new Date(entry.time).getDate() === i && entry.type === "income"
        )
        .reduce((acc, entry) => acc + entry.amount, 0),
      expense: -props.data
        .filter(
          (entry) =>
            new Date(entry.time).getDate() === i && entry.type === "expense"
        )
        .reduce((acc, entry) => acc + entry.amount, 0),
    });
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={viewData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="expense" fill="#8884d8" name="Expense" />
        <Bar dataKey="income" fill="#82ca9d" name="Income" />
      </BarChart>
    </ResponsiveContainer>
  );
}
