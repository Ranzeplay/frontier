import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { AccountingEntry } from "../../../models/accounting";

type AccountingRadarChartEntry = {
  category: string;
  amount: number;
};

export function AccountingRadarChart(props: { data: AccountingEntry[] }) {
  const expense: AccountingRadarChartEntry[] = [];
  for (const entry of props.data.filter((e) => e.type == "expense")) {
    if (expense.findIndex((e) => e.category === entry.category) === -1) {
      expense.push({
        category: entry.category,
        amount: entry.amount,
      });
    } else {
      const index = expense.findIndex((e) => e.category === entry.category);
      expense[index].amount += entry.amount;
    }
  }

  const income: AccountingRadarChartEntry[] = [];
  for (const entry of props.data.filter((e) => e.type == "income")) {
    if (income.findIndex((e) => e.category === entry.category) === -1) {
      income.push({
        category: entry.category,
        amount: entry.amount,
      });
    } else {
      const index = income.findIndex((e) => e.category === entry.category);
      income[index].amount += entry.amount;
    }
  }

  return (
    <div className="flex flex-row mx-0">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={income}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis angle={30} domain={[0, 200]} />
          <Radar
            name="Income"
            dataKey="amount"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={expense}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis angle={30} domain={[0, 200]} />
          <Radar
            name="Expense"
            dataKey="amount"
            stroke="#ea580c"
            fill="#ea580c"
            fillOpacity={0.6}
          />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
