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

const miaeData = [
  { name: "Jan", income: 4000, expense: -2000 },
  { name: "Feb", income: 3000, expense: -1500 },
  { name: "Mar", income: 5000, expense: -3000 },
  { name: "Apr", income: 4000, expense: -2000 },
  { name: "May", income: 3000, expense: -1500 },
  { name: "Jun", income: 5000, expense: -3000 },
  { name: "Jul", income: 4000, expense: -2000 },
  { name: "Aug", income: 3000, expense: -1500 },
  { name: "Sep", income: 5000, expense: -3000 },
  { name: "Oct", income: 4000, expense: -2000 },
  { name: "Nov", income: 3000, expense: -1500 },
  { name: "Dec", income: 5000, expense: -3000 },
];

export default function AccountingOverviewPage() {
  return (
    <div className="p-8 flex flex-col space-y-4">
      <h1 className="text-4xl font-bold">Accounting Overview</h1>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl">
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800">
            Monthly income and expenditure
          </h3>
          <div className="mt-5 flex flex-row">
            <IndividualExpenseIncomeChart />
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl">
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800">
            Waterfall chart of cumulative income
          </h3>
          <div className="mt-5 flex flex-row">
            <WaterfallChart />
          </div>
        </div>
      </div>
    </div>
  );
}

function IndividualExpenseIncomeChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={miaeData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
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

function WaterfallChart() {
  return <div></div>;
}
