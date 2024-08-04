import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Bar, BarChart } from "recharts";
import { AccountingEntry } from "../../../models/accounting";

export function IncomeExpenseChart(props: { data: AccountingEntry[] }) {
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
