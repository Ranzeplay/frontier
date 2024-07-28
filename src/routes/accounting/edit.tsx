import {
  Field,
  Input,
  Label,
  Radio,
  RadioGroup,
  Textarea,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountingService } from "../../services/accountingService";

export default function AccountingEditPage() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [time, setTime] = useState<Date>(new Date());
  const [remark, setRemark] = useState("");

  useEffect(() => {
    async function fetchAccountingEntry() {
      const entry = await AccountingService.getAccountingEntryById(id!);
      setTitle(entry!.title);
      setCategory(entry!.category);
      setType(entry!.type);
      setAmount(entry!.amount);
      setTime(new Date(entry!.time));
      setRemark(entry!.remark);
    }

    fetchAccountingEntry();
  }, [id]);

  const navigate = useNavigate();
  async function handleSubmit() {
    await AccountingService.updateAccountingEntry({
      id: id!,
      title,
      category,
      type,
      amount: amount ?? 0,
      time,
      remark,
    });

    navigate("/accounting");
  }

  function handleDiscard() {
    navigate(-1);
  }

  async function handleDelete() {
    await AccountingService.deleteAccountingEntry(id!);
  }

  return (
    <div className="p-8 flex flex-col space-y-4">
      <h1 className="text-4xl font-bold">Edit accounting entry</h1>
      <div className="flex flex-col space-y-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 border rounded-md shadow"
          placeholder="Title"
        />

        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-md shadow"
          placeholder="Category"
        />

        <div className="px-4 py-2 border rounded-md shadow bg-white flex flex-row space-x-6 items-center">
          <p className="text-gray-400">Type</p>
          <RadioGroup
            className="flex flex-row space-x-3"
            value={type}
            onChange={(e) => setType(e)}
          >
            <Field className="flex flex-row items-center gap-2">
              <Radio
                value="income"
                className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100 transition cursor-pointer"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <Label className="data-[disabled]:opacity-50">Income</Label>
            </Field>
            <Field className="flex items-center gap-2">
              <Radio
                value="expense"
                className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100 transition cursor-pointer"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <Label className="data-[disabled]:opacity-50">Expense</Label>
            </Field>
          </RadioGroup>
        </div>

        <Input
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="px-4 py-2 border rounded-md shadow"
          placeholder="Amount"
          type="number"
        />

        <Input
          value={time.toISOString().slice(0, 16)}
          onChange={(e) => setTime(new Date(e.target.value))}
          className="px-4 py-2 border rounded-md shadow"
          placeholder="Time"
          type="datetime-local"
        />

        <Textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="px-4 py-2 border rounded-md shadow"
          placeholder="Remark"
          rows={6}
        />

        <div className="block space-x-2">
          <button
            onClick={handleSubmit}
            className="px-3 py-1 border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer transition rounded-md"
          >
            Submit
          </button>
          <button
            onClick={handleDiscard}
            className="px-3 py-1 border text-gray-500 border-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer transition rounded-md"
          >
            Discard
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 border text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer transition rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
