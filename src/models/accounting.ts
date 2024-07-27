export type AccountingEntry = {
  id: string;
  title: string;
  remark: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  time: Date;
};
